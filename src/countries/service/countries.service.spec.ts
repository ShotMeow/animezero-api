import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { CountriesRepository } from '../repository/countries.repository';
import { CountriesService } from './countries.service';
import type { Country } from '../countries.model';

describe(`Countries Service`, () => {
  let mockedCountriesRepository: CountriesRepository;
  let countriesService: CountriesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CountriesService, CountriesRepository],
    })
      .overrideProvider(CountriesRepository)
      .useValue(mockDeep<CountriesRepository>())
      .compile();

    mockedCountriesRepository = moduleRef.get(CountriesRepository);
    countriesService = moduleRef.get(CountriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(countriesService).toBeDefined();
  });

  describe('Get country by unique input', () => {
    it('Should get a not found error', async () => {
      const getCountryById = (): Promise<Country> =>
        countriesService.getCountryById(1);

      await expect(getCountryById()).rejects.toThrow(NotFoundException);
    });

    it('Should get a country by id', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (
        mockedCountriesRepository.getCountryByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedCountry);

      const getCountryById = (): Promise<Country> =>
        countriesService.getCountryById(1);

      await expect(getCountryById()).resolves.toBe(mockedCountry);
    });
  });

  describe('Get countries', () => {
    it('Should get a list of Countries', async () => {
      const mockedCountriesList: Country[] = [
        {
          id: 1,
          name: 'Russia',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Japan',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];
      (mockedCountriesRepository.getCountries as jest.Mock).mockResolvedValue(
        mockedCountriesList,
      );

      await expect(countriesService.getCountries()).resolves.toEqual(
        mockedCountriesList,
      );
    });
  });

  describe('Create country', () => {
    it('Should get a bad request error', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (
        mockedCountriesRepository.getCountryByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedCountry);

      const createCountry = (): Promise<Country> =>
        countriesService.createCountry({
          name: mockedCountry.name,
        });

      await expect(createCountry()).rejects.toThrow(BadRequestException);
    });

    it('Should create a new country', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedCountriesRepository.createCountry as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const createCountry = (): Promise<Country> =>
        countriesService.createCountry({ name: mockedCountry.name });

      await expect(createCountry()).resolves.toBe(mockedCountry);
    });
  });

  describe('Update country', () => {
    it('Should get a bad request error', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (
        mockedCountriesRepository.getCountryByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedCountry);

      const updateCountry = (): Promise<Country> =>
        countriesService.updateCountry(1, { name: mockedCountry.name });

      await expect(updateCountry()).rejects.toThrow(BadRequestException);
    });

    it('Should update a country', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedCountriesRepository.updateCountry as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const updateCountry = (): Promise<Country> =>
        countriesService.updateCountry(1, { name: mockedCountry.name });

      await expect(updateCountry()).resolves.toBe(mockedCountry);
    });
  });

  describe('Delete country', () => {
    it('Should delete a country', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedCountriesRepository.deleteCountry as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const deleteCountry = (): Promise<Country> =>
        countriesService.deleteCountry(1);

      await expect(deleteCountry()).resolves.toBe(mockedCountry);
    });
  });
});
