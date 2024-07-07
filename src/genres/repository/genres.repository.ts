import { Injectable } from '@nestjs/common';
import type { Genre, Prisma } from '@prisma/client';

import { PrismaService } from '@/database/service/prisma.service';

@Injectable()
export class GenresRepository {
  constructor(private prisma: PrismaService) {}

  async getGenres(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GenreWhereUniqueInput;
    where?: Prisma.GenreWhereInput;
    orderBy?: Prisma.GenreOrderByWithRelationInput;
  }): Promise<Genre[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.genre.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getGenreByUniqueInput(params: {
    where: Prisma.GenreWhereUniqueInput;
  }): Promise<Genre> {
    const { where } = params;
    return this.prisma.genre.findUnique({ where });
  }

  async createGenre(params: { data: Prisma.GenreCreateInput }): Promise<Genre> {
    const { data } = params;
    return this.prisma.genre.create({ data });
  }

  async updateGenre(params: {
    where: Prisma.GenreWhereUniqueInput;
    data: Prisma.GenreUpdateInput;
  }): Promise<Genre> {
    const { where, data } = params;
    return this.prisma.genre.update({ where, data });
  }

  async deleteGenre(params: {
    where: Prisma.GenreWhereUniqueInput;
  }): Promise<Genre> {
    const { where } = params;
    return this.prisma.genre.delete({ where });
  }
}
