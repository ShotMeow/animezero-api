import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { MoviesService } from '../service/movies.service';
import { CreateMovieInput, Movie, UpdateMovieInput } from '../movies.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/auth/guards/gqlAuth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/utils/enums';
import { Options } from '@/utils/base.model';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => Movie)
  async getMovieById(@Args('id') id: number): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Query(() => [Movie])
  async getMovies(
    @Args('options', { nullable: true }) options?: Options,
  ): Promise<Movie[]> {
    return this.moviesService.getMovies(options);
  }

  @Mutation(() => Movie)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async createMovie(@Args('movie') data: CreateMovieInput): Promise<Movie> {
    return this.moviesService.createMovie(data);
  }

  @Mutation(() => Movie)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async updateMovie(
    @Args('id') id: number,
    @Args('movie') data: UpdateMovieInput,
  ): Promise<Movie> {
    return this.moviesService.updateMovie(id, data);
  }

  @Mutation(() => Movie)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async deleteMovie(@Args('id') id: number): Promise<Movie> {
    return this.moviesService.deleteMovie(id);
  }
}
