import { Injectable } from '@nestjs/common';
import type { Genre } from '@prisma/client';
import { GenresRepository } from '@/genres/repository/genres.repository';
import { CreateGenreInput, UpdateGenreInput } from '@/genres/genres.model';

@Injectable()
export class GenresService {
  constructor(private genresRepository: GenresRepository) {}

  async getGenreById(id: number): Promise<Genre> {
    return this.genresRepository.getGenreByUniqueInput({ where: { id } });
  }

  async getGenres(): Promise<Genre[]> {
    return this.genresRepository.getGenres({});
  }

  async createGenre(data: CreateGenreInput): Promise<Genre> {
    return this.genresRepository.createGenre({ data });
  }

  async updateGenre(id: number, data: UpdateGenreInput): Promise<Genre> {
    return this.genresRepository.updateGenre({ where: { id }, data });
  }

  async deleteGenre(id: number): Promise<Genre> {
    return this.genresRepository.deleteGenre({ where: { id } });
  }
}
