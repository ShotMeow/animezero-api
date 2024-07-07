import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CountriesService } from '@/countries/service/countries.service';
import {
  Country,
  CreateCountryInput,
  UpdateCountryInput,
} from '@/countries/countries.model';

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
  async createCountry(
    @Args('country') data: CreateCountryInput,
  ): Promise<Country> {
    return this.countriesService.createCountry(data);
  }

  @Mutation(() => Country)
  async updateCountry(
    @Args('id') id: number,
    @Args('country') data: UpdateCountryInput,
  ): Promise<Country> {
    return this.countriesService.updateCountry(id, data);
  }

  @Mutation(() => Country)
  async deleteCountry(@Args('id') id: number): Promise<Country> {
    return this.countriesService.deleteCountry(id);
  }
}
