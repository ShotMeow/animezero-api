import { Injectable } from '@nestjs/common';
import type { Country, Prisma } from '@prisma/client';

import { PrismaService } from '@/database/service/prisma.service';

@Injectable()
export class CountriesRepository {
  constructor(private prisma: PrismaService) {}

  async getCountries(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CountryWhereUniqueInput;
    where?: Prisma.CountryWhereInput;
    orderBy?: Prisma.CountryOrderByWithRelationInput;
  }): Promise<Country[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.country.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getCountryByUniqueInput(params: {
    where: Prisma.CountryWhereUniqueInput;
  }): Promise<Country> {
    const { where } = params;
    return this.prisma.country.findUnique({ where });
  }

  async createCountry(params: {
    data: Prisma.CountryCreateInput;
  }): Promise<Country> {
    const { data } = params;
    return this.prisma.country.create({ data });
  }

  async updateCountry(params: {
    where: Prisma.CountryWhereUniqueInput;
    data: Prisma.CountryUpdateInput;
  }): Promise<Country> {
    const { where, data } = params;
    return this.prisma.country.update({ where, data });
  }

  async deleteCountry(params: {
    where: Prisma.CountryWhereUniqueInput;
  }): Promise<Country> {
    const { where } = params;
    return this.prisma.country.delete({ where });
  }
}
