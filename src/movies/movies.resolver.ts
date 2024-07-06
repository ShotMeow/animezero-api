import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MoviesService } from '@/movies/movies.service';
import { CreateMovieInput, Movie } from '@/movies/movies.model';

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
}
