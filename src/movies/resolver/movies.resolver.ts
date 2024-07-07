import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MoviesService } from '../service/movies.service';
import { CreateMovieInput, Movie, UpdateMovieInput } from '../movies.model';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => Movie)
  async getMovieById(@Args('id') id: number): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Query(() => [Movie])
  async getMovies(): Promise<Movie[]> {
    return this.moviesService.getMovies();
  }

  @Mutation(() => Movie)
  async createMovie(@Args('movie') data: CreateMovieInput): Promise<Movie> {
    return this.moviesService.createMovie(data);
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Args('id') id: number,
    @Args('movie') data: UpdateMovieInput,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(id, data);
  }

  @Mutation(() => Movie)
  async deleteMovie(@Args('id') id: number): Promise<Movie> {
    return this.moviesService.deleteMovie(id);
  }
}
