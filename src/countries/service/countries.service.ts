import { Injectable } from '@nestjs/common';
import type { Country } from '@prisma/client';
import { CountriesRepository } from '@/countries/repository/countries.repository';
import {
  CreateCountryInput,
  UpdateCountryInput,
} from '@/countries/countries.model';

@Injectable()
export class CountriesService {
  constructor(private countriesRepository: CountriesRepository) {}

  async getCountryById(id: number): Promise<Country> {
    return this.countriesRepository.getCountryByUniqueInput({ where: { id } });
  }

  async getCountries(): Promise<Country[]> {
    return this.countriesRepository.getCountries({});
  }

  async createCountry(data: CreateCountryInput): Promise<Country> {
    return this.countriesRepository.createCountry({ data });
  }

  async updateCountry(id: number, data: UpdateCountryInput): Promise<Country> {
    return this.countriesRepository.updateCountry({ where: { id }, data });
  }

  async deleteCountry(id: number): Promise<Country> {
    return this.countriesRepository.deleteCountry({ where: { id } });
  }
}
