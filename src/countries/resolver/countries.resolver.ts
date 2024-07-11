import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CountriesService } from '../service/countries.service';
import {
  Country,
  CreateCountryInput,
  UpdateCountryInput,
} from '../countries.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/auth/guards/gqlAuth.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/utils/enums';
import { RolesGuard } from '@/auth/guards/roles.guard';

@Resolver()
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Query(() => Country)
  async getCountryById(@Args('id') id: number): Promise<Country> {
    return this.countriesService.getCountryById(id);
  }

  @Query(() => [Country])
  async getCountries(): Promise<Country[]> {
    return this.countriesService.getCountries();
  }

  @Mutation(() => Country)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async createCountry(
    @Args('country') data: CreateCountryInput,
  ): Promise<Country> {
    return this.countriesService.createCountry(data);
  }

  @Mutation(() => Country)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async updateCountry(
    @Args('id') id: number,
    @Args('country') data: UpdateCountryInput,
  ): Promise<Country> {
    return this.countriesService.updateCountry(id, data);
  }

  @Mutation(() => Country)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async deleteCountry(@Args('id') id: number): Promise<Country> {
    return this.countriesService.deleteCountry(id);
  }
}
