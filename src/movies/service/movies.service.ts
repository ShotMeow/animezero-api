import { Injectable } from '@nestjs/common';

import { MoviesRepository } from '../repository/movies.repository';
import type {
  CreateMovieInput,
  Movie,
  UpdateMovieInput,
} from '../movies.model';

@Injectable()
export class MoviesService {
  constructor(private repository: MoviesRepository) {}

  async getMovies(): Promise<Movie[]> {
    return this.repository.getMovies({});
  }

  async createMovie(data: CreateMovieInput) {
    return this.repository.createMovie({ data });
  }

  async updateMovie(id: number, data: UpdateMovieInput) {
    return this.repository.updateMovie({ where: { id }, data });
  }

  async deleteMovie(id: number) {
    return this.repository.deleteMovie({ where: { id } });
  }
}
