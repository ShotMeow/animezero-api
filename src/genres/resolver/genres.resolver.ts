import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from '@/genres/service/genres.service';
import { CreateGenreInput, Genre, UpdateGenreInput } from '../genres.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/auth/guards/gqlAuth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/utils/enums';
import { Options } from '@/utils/base.model';

@Resolver()
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query(() => Genre)
  async getGenreById(@Args('id') id: number): Promise<Genre> {
    return this.genresService.getGenreById(id);
  }

  @Query(() => [Genre])
  async getGenres(
    @Args('options', { nullable: true }) options?: Options,
  ): Promise<Genre[]> {
    return this.genresService.getGenres(options);
  }

  @Mutation(() => Genre)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async createGenre(@Args('genre') data: CreateGenreInput): Promise<Genre> {
    return this.genresService.createGenre(data);
  }

  @Mutation(() => Genre)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async updateGenre(
    @Args('id') id: number,
    @Args('genre') data: UpdateGenreInput,
  ): Promise<Genre> {
    return this.genresService.updateGenre(id, data);
  }

  @Mutation(() => Genre)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async deleteGenre(@Args('id') id: number): Promise<Genre> {
    return this.genresService.deleteGenre(id);
  }
}
