import { Injectable } from '@nestjs/common';
import type { Episode, Prisma } from '@prisma/client';

import { PrismaService } from '@/database/service/prisma.service';

@Injectable()
export class EpisodesRepository {
  constructor(private prisma: PrismaService) {}

  async getEpisodes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EpisodeWhereUniqueInput;
    where?: Prisma.EpisodeWhereInput;
    orderBy?: Prisma.EpisodeOrderByWithRelationInput;
  }): Promise<Episode[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.episode.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getEpisodeByUniqueInput(params: {
    where: Prisma.EpisodeWhereUniqueInput;
  }): Promise<Episode> {
    const { where } = params;
    return this.prisma.episode.findUnique({ where });
  }

  async createEpisode(params: {
    movieId: number;
    data: Prisma.EpisodeCreateInput;
  }): Promise<Episode> {
    const { movieId, data } = params;
    return this.prisma.episode.create({
      data: {
        ...data,
        movie: {
          connect: {
            id: movieId,
          },
        },
      },
    });
  }

  async updateEpisode(params: {
    where: Prisma.EpisodeWhereUniqueInput;
    data: Prisma.EpisodeUpdateInput;
  }): Promise<Episode> {
    const { where, data } = params;
    return this.prisma.episode.update({ where, data });
  }

  async deleteEpisode(params: {
    where: Prisma.EpisodeWhereUniqueInput;
  }): Promise<Episode> {
    const { where } = params;

    return this.prisma.episode.delete({ where });
  }
}
