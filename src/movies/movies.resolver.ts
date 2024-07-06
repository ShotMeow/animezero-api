import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MoviesService } from './movies.service';
import { CreateMovieInput, Movie, UpdateMovieInput } from './movies.model';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => [Movie])
  async getMovies() {
    return this.moviesService.getMovies();
  }

  @Mutation(() => Movie)
  async createMovie(@Args('movie') data: CreateMovieInput) {
    return this.moviesService.createMovie(data);
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Args('id') id: number,
    @Args('movie') data: UpdateMovieInput,
  ) {
    return this.moviesService.updateMovie(id, data);
  }

  @Mutation(() => Movie)
  async deleteMovie(@Args('id') id: number) {
    return this.moviesService.deleteMovie(id);
  }
}