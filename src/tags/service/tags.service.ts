import { Injectable } from '@nestjs/common';
import type { Tag } from '@prisma/client';
import { TagsRepository } from '@/tags/repository/tags.repository';
import { CreateTagInput, UpdateTagInput } from '@/tags/tags.model';

@Injectable()
export class TagsService {
  constructor(private tagsRepository: TagsRepository) {}

  async getTagById(id: number): Promise<Tag> {
    return this.tagsRepository.getTagByUniqueInput({ where: { id } });
  }

  async getTags(): Promise<Tag[]> {
    return this.tagsRepository.getTags({});
  }

  async createTag(data: CreateTagInput): Promise<Tag> {
    return this.tagsRepository.createTag({ data });
  }

  async updateTag(id: number, data: UpdateTagInput): Promise<Tag> {
    return this.tagsRepository.updateTag({ where: { id }, data });
  }

  async deleteTag(id: number): Promise<Tag> {
    return this.tagsRepository.deleteTag({ where: { id } });
  }
}
