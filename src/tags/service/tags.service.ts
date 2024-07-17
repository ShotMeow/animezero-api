import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Tag } from '@prisma/client';
import { TagsRepository } from '@/tags/repository/tags.repository';
import { CreateTagInput, UpdateTagInput } from '@/tags/tags.model';

@Injectable()
export class TagsService {
  constructor(private tagsRepository: TagsRepository) {}

  async getTagById(id: number): Promise<Tag> {
    const tag = await this.tagsRepository.getTagByUniqueInput({
      where: { id },
    });

    if (!tag) {
      throw new NotFoundException('Такого тега не существует');
    }

    return tag;
  }

  async getTags(): Promise<Tag[]> {
    return this.tagsRepository.getTags({});
  }

  async createTag(data: CreateTagInput): Promise<Tag> {
    const existedTag = await this.tagsRepository.getTagByUniqueInput({
      where: {
        name: data.name,
      },
    });

    if (existedTag) {
      throw new BadRequestException(
        `Тег под названием «${data.name}» уже существует`,
      );
    }

    return this.tagsRepository.createTag({ data });
  }

  async updateTag(id: number, data: UpdateTagInput): Promise<Tag> {
    const existedTag = await this.tagsRepository.getTagByUniqueInput({
      where: {
        name: data.name,
      },
    });

    if (existedTag) {
      throw new BadRequestException(
        `Тег под названием «${data.name}» уже существует`,
      );
    }

    return this.tagsRepository.updateTag({ where: { id }, data });
  }

  async deleteTag(id: number): Promise<Tag> {
    return this.tagsRepository.deleteTag({ where: { id } });
  }
}
