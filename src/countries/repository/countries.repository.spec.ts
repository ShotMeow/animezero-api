import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/database/service/prisma.service';
import { CountriesRepository } from './countries.repository';
import type { Country } from '../countries.model';

describe(`Countries Repository`, () => {
  let mockedPrismaService: PrismaClient;
  let countriesRepository: CountriesRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CountriesRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    mockedPrismaService = moduleRef.get(PrismaService);
    countriesRepository = moduleRef.get(CountriesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(countriesRepository).toBeDefined();
  });

  describe('Get country by unique input', () => {
    it('Should get a country by id', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.country.findUnique as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const getCountryById = (): Promise<Country> =>
        countriesRepository.getCountryByUniqueInput({
          where: { id: 1 },
        });

      await expect(getCountryById()).resolves.toBe(mockedCountry);
    });

    it('Should get a country by name', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.country.findUnique as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const getCountryByTitle = (): Promise<Country> =>
        countriesRepository.getCountryByUniqueInput({
          where: { name: 'Russia' },
        });

      await expect(getCountryByTitle()).resolves.toBe(mockedCountry);
    });
  });

  describe('Get Country', () => {
    it('Should get a list of countries', async () => {
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
      (mockedPrismaService.country.findMany as jest.Mock).mockResolvedValue(
        mockedCountriesList,
      );

      const getCountries = async (): Promise<Country[]> => {
        return countriesRepository.getCountries({});
      };

      await expect(getCountries()).resolves.toEqual(mockedCountriesList);
    });
  });

  describe('Create country', () => {
    it('Should create a new country', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.country.create as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const createCountry = (): Promise<Country> =>
        countriesRepository.createCountry({
          data: mockedCountry,
        });

      await expect(createCountry()).resolves.toBe(mockedCountry);
    });
  });

  describe('Update country', () => {
    it('Should update a country', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.country.update as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const updateCountry = (): Promise<Country> =>
        countriesRepository.updateCountry({
          where: { id: 1 },
          data: mockedCountry,
        });

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
      (mockedPrismaService.country.delete as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const deleteCountry = (): Promise<Country> =>
        countriesRepository.deleteCountry({
          where: { id: 1 },
        });

      await expect(deleteCountry()).resolves.toBe(mockedCountry);
    });
  });
});
