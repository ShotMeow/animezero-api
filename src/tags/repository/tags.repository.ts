import { Injectable } from '@nestjs/common';
import type { Prisma, Tag } from '@prisma/client';

import { PrismaService } from '@/database/service/prisma.service';

@Injectable()
export class TagsRepository {
  constructor(private prisma: PrismaService) {}

  async getTags(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
  }): Promise<Tag[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tag.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getTagByUniqueInput(params: {
    where: Prisma.TagWhereUniqueInput;
  }): Promise<Tag> {
    const { where } = params;
    return this.prisma.tag.findUnique({ where });
  }

  async createTag(params: { data: Prisma.TagCreateInput }): Promise<Tag> {
    const { data } = params;
    return this.prisma.tag.create({ data });
  }

  async updateTag(params: {
    where: Prisma.TagWhereUniqueInput;
    data: Prisma.TagUpdateInput;
  }): Promise<Tag> {
    const { where, data } = params;
    return this.prisma.tag.update({ where, data });
  }

  async deleteTag(params: { where: Prisma.TagWhereUniqueInput }): Promise<Tag> {
    const { where } = params;
    return this.prisma.tag.delete({ where });
  }
}
