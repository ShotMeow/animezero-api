import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { EpisodesService } from '../service/episodes.service';
import {
  CreateEpisodeInput,
  Episode,
  UpdateEpisodeInput,
} from '../episodes.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/auth/guards/gqlAuth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/utils/enums';
import { Options } from '@/utils/base.model';

@Resolver()
export class EpisodesResolver {
  constructor(private readonly episodesService: EpisodesService) {}

  @Query(() => Episode)
  async getEpisodeById(@Args('id') id: number): Promise<Episode> {
    return this.episodesService.getEpisodeById(id);
  }

  @Query(() => [Episode])
  async getEpisodes(
    @Args('options', { nullable: true }) options?: Options,
  ): Promise<Episode[]> {
    return this.episodesService.getEpisodes(options);
  }

  @Mutation(() => Episode)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async createEpisode(
    @Args('movieId') movieId: number,
    @Args('episode') data: CreateEpisodeInput,
  ): Promise<Episode> {
    return this.episodesService.createEpisode(movieId, data);
  }

  @Mutation(() => Episode)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async updateEpisode(
    @Args('id') id: number,
    @Args('episode') data: UpdateEpisodeInput,
  ): Promise<Episode> {
    return this.episodesService.updateEpisode(id, data);
  }

  @Mutation(() => Episode)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async deleteEpisode(@Args('id') id: number): Promise<Episode> {
    return this.episodesService.deleteEpisode(id);
  }
}
