import { Injectable } from '@nestjs/common';
import { MoviesRepository } from '@/movies/movies.repository';
import type { Movie } from '@prisma/client';
import { CreateMovieInput } from '@/movies/movies.model';

@Injectable()
export class MoviesService {
  constructor(private repository: MoviesRepository) {}

  async getMovies(): Promise<Movie[]> {
    return await this.repository.getMovies({});
  }

  async createMovie(data: CreateMovieInput) {
    return this.repository.createMovie({ data });
  }
}
