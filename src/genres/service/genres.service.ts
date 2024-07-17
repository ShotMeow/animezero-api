import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Genre } from '@prisma/client';
import { GenresRepository } from '@/genres/repository/genres.repository';
import { CreateGenreInput, UpdateGenreInput } from '@/genres/genres.model';
import { Options } from '@/utils/base.model';

@Injectable()
export class GenresService {
  constructor(private genresRepository: GenresRepository) {}

  async getGenreById(id: number): Promise<Genre> {
    const genre = await this.genresRepository.getGenreByUniqueInput({
      where: { id },
    });

    if (!genre) {
      throw new NotFoundException('Такого жанра не существует');
    }

    return genre;
  }

  async getGenres(options: Options): Promise<Genre[]> {
    const haveOrderBy = options && options.orderBy;

    return this.genresRepository.getGenres({
      ...options,
      orderBy: haveOrderBy && {
        updatedAt: options.orderBy,
      },
    });
  }

  async createGenre(data: CreateGenreInput): Promise<Genre> {
    const existedGenre = await this.genresRepository.getGenreByUniqueInput({
      where: {
        name: data.name,
      },
    });

    if (existedGenre) {
      throw new BadRequestException(`Жанр «${data.name}» уже существует`);
    }

    return this.genresRepository.createGenre({ data });
  }

  async updateGenre(id: number, data: UpdateGenreInput): Promise<Genre> {
    const existedGenre = await this.genresRepository.getGenreByUniqueInput({
      where: {
        name: data.name,
      },
    });

    if (existedGenre) {
      throw new BadRequestException(`Жанр «${data.name}» уже существует`);
    }

    return this.genresRepository.updateGenre({ where: { id }, data });
  }

  async deleteGenre(id: number): Promise<Genre> {
    return this.genresRepository.deleteGenre({ where: { id } });
  }
}
