import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Genre } from '@prisma/client';
import { GenresRepository } from '@/genres/repository/genres.repository';
import { CreateGenreInput, UpdateGenreInput } from '@/genres/genres.model';

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

  async getGenres(): Promise<Genre[]> {
    return this.genresRepository.getGenres({});
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
