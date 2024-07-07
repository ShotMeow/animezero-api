import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { CountriesService } from '../service/countries.service';
import { CountriesResolver } from './countries.resolver';
import type { Country } from '../countries.model';

describe(`Countries Resolver`, () => {
  let mockedCountriesService: CountriesService;
  let countriesResolver: CountriesResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CountriesService, CountriesResolver],
    })
      .overrideProvider(CountriesService)
      .useValue(mockDeep<CountriesService>())
      .compile();

    mockedCountriesService = moduleRef.get(CountriesService);
    countriesResolver = moduleRef.get(CountriesResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(countriesResolver).toBeDefined();
  });

  describe('Get country by unique input', () => {
    it('Should get a film by id', async () => {
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedCountriesService.getCountryById as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const getCountryById = (): Promise<Country> =>
        countriesResolver.getCountryById(1);

      await expect(getCountryById()).resolves.toBe(mockedCountry);
    });
  });

  describe('Get Countries', () => {
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
      (mockedCountriesService.getCountries as jest.Mock).mockResolvedValue(
        mockedCountriesList,
      );

      await expect(countriesResolver.getCountries()).resolves.toEqual(
        mockedCountriesList,
      );
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
      (mockedCountriesService.createCountry as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const createCountry = (): Promise<Country> =>
        countriesResolver.createCountry(mockedCountry);

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
      (mockedCountriesService.updateCountry as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const updateCountry = (): Promise<Country> =>
        countriesResolver.updateCountry(1, mockedCountry);

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
      (mockedCountriesService.deleteCountry as jest.Mock).mockResolvedValue(
        mockedCountry,
      );

      const deleteCountry = (): Promise<Country> =>
        countriesResolver.deleteCountry(1);

      await expect(deleteCountry()).resolves.toBe(mockedCountry);
    });
  });
});
