import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Country } from '@prisma/client';

import { CountriesRepository } from '../repository/countries.repository';
import {
  CreateCountryInput,
  UpdateCountryInput,
} from '@/countries/countries.model';

@Injectable()
export class CountriesService {
  constructor(private countriesRepository: CountriesRepository) {}

  async getCountryById(id: number): Promise<Country> {
    const country = await this.countriesRepository.getCountryByUniqueInput({
      where: { id },
    });

    if (!country) {
      throw new NotFoundException('Такой страны не существует');
    }

    return country;
  }

  async getCountries(): Promise<Country[]> {
    return this.countriesRepository.getCountries({});
  }

  async createCountry(data: CreateCountryInput): Promise<Country> {
    const existedCountry =
      await this.countriesRepository.getCountryByUniqueInput({
        where: {
          name: data.name,
        },
      });

    if (existedCountry) {
      throw new BadRequestException(`Страна «${data.name}» уже существует`);
    }

    return this.countriesRepository.createCountry({ data });
  }

  async updateCountry(id: number, data: UpdateCountryInput): Promise<Country> {
    const existedCountry =
      await this.countriesRepository.getCountryByUniqueInput({
        where: {
          name: data.name,
        },
      });

    if (existedCountry) {
      throw new BadRequestException(`Страна «${data.name}» уже существует`);
    }

    return this.countriesRepository.updateCountry({ where: { id }, data });
  }

  async deleteCountry(id: number): Promise<Country> {
    return this.countriesRepository.deleteCountry({ where: { id } });
  }
}
