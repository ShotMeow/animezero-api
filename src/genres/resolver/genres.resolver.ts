import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from '@/genres/service/genres.service';
import { CreateGenreInput, Genre, UpdateGenreInput } from '../genres.model';

@Resolver()
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query(() => Genre)
  async getGenreById(@Args('id') id: number): Promise<Genre> {
    return this.genresService.getGenreById(id);
  }

  @Query(() => [Genre])
  async getGenres(): Promise<Genre[]> {
    return this.genresService.getGenres();
  }

  @Mutation(() => Genre)
  async createGenre(@Args('genre') data: CreateGenreInput): Promise<Genre> {
    return this.genresService.createGenre(data);
  }

  @Mutation(() => Genre)
  async updateGenre(
    @Args('id') id: number,
    @Args('genre') data: UpdateGenreInput,
  ): Promise<Genre> {
    return this.genresService.updateGenre(id, data);
  }

  @Mutation(() => Genre)
  async deleteGenre(@Args('id') id: number): Promise<Genre> {
    return this.genresService.deleteGenre(id);
  }
}
