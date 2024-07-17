import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { MoviesRepository } from '../repository/movies.repository';
import { MoviesService } from './movies.service';
import type { Movie } from '../movies.model';

import { CountriesModule } from '@/countries/countries.module';
import { CountriesService } from '@/countries/service/countries.service';
import type { Country } from '@/countries/countries.model';

describe(`Movies Service`, () => {
  let mockedMoviesRepository: MoviesRepository;
  let mockedCountriesService: CountriesService;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MoviesService, MoviesRepository],
      imports: [CountriesModule],
    })
      .overrideProvider(MoviesRepository)
      .useValue(mockDeep<MoviesRepository>())
      .overrideProvider(CountriesService)
      .useValue(mockDeep<CountriesService>())
      .compile();

    mockedMoviesRepository = moduleRef.get(MoviesRepository);
    mockedCountriesService = moduleRef.get(CountriesService);
    moviesService = moduleRef.get(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(moviesService).toBeDefined();
  });

  describe('Get movie by unique input', () => {
    it('Should get a not found error', async () => {
      const getMovieById = (): Promise<Movie> => moviesService.getMovieById(1);

      await expect(getMovieById()).rejects.toThrow(NotFoundException);
    });

    it('Should get a film by id', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrl.mp4',
        pictureUrl: 'https://animezero.ru/videos/pictureUrl.webp',
        ageRating: '6+',
        rating: 9.5,
        status: 'Ongoing',
        countryId: 1,
        year: 2005,
        type: 'Film',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (
        mockedMoviesRepository.getMovieByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedMovie);

      const getMovieById = (): Promise<Movie> => moviesService.getMovieById(1);

      await expect(getMovieById()).resolves.toBe(mockedMovie);
    });
  });

  describe('Get movies', () => {
    it('Should get a list of Movies', async () => {
      const mockedMoviesList: Movie[] = [
        {
          id: 1,
          title: 'Movie title 1',
          description: 'Movie description',
          wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrl.mp4',
          pictureUrl: 'https://animezero.ru/videos/pictureUrl.webp',
          ageRating: '6+',
          rating: 9.5,
          status: 'Ongoing',
          countryId: 1,
          year: 2005,
          type: 'Film',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Movie title 2',
          description: 'Movie description',
          wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrl.mp4',
          pictureUrl: 'https://animezero.ru/videos/pictureUrl.webp',
          ageRating: '6+',
          rating: 9.5,
          status: 'Ongoing',
          countryId: 1,
          year: 2005,
          type: 'Film',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];
      (mockedMoviesRepository.getMovies as jest.Mock).mockResolvedValue(
        mockedMoviesList,
      );

      await expect(moviesService.getMovies()).resolves.toEqual(
        mockedMoviesList,
      );
    });
  });

  describe('Create movie', () => {
    it('Should get a bad request error', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrl.mp4',
        pictureUrl: 'https://animezero.ru/videos/pictureUrl.webp',
        ageRating: '6+',
        rating: 9.5,
        status: 'Ongoing',
        countryId: 1,
        year: 2005,
        type: 'Film',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (
        mockedMoviesRepository.getMovieByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedMovie);

      const createMovie = (): Promise<Movie> =>
        moviesService.createMovie({
          title: mockedMovie.title,
          description: mockedMovie.description,
          wallpaperUrl: mockedMovie.wallpaperUrl,
          pictureUrl: mockedMovie.pictureUrl,
          ageRating: mockedMovie.ageRating,
          rating: mockedMovie.rating,
          status: mockedMovie.status,
          countryId: mockedMovie.countryId,
          year: mockedMovie.year,
          type: mockedMovie.type,
        });

      await expect(createMovie()).rejects.toThrow(BadRequestException);
    });

    it('Should get a country not found error', async () => {
      const createMovie = (): Promise<Movie> =>
        moviesService.createMovie({
          title: 'Movie title',
          description: 'Movie description',
          wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrl.mp4',
          pictureUrl: 'https://animezero.ru/videos/pictureUrl.webp',
          ageRating: '6+',
          rating: 9.5,
          status: 'Ongoing',
          countryId: 1,
          year: 2005,
          type: 'Film',
        });

      await expect(createMovie()).rejects.toThrow(NotFoundException);
    });

    it('Should create a new movie', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrl.mp4',
        pictureUrl: 'https://animezero.ru/videos/pictureUrl.webp',
        ageRating: '6+',
        rating: 9.5,
        status: 'Ongoing',
        countryId: 1,
        year: 2005,
        type: 'Film',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedCountriesService.getCountryById as jest.Mock).mockResolvedValue(
        mockedCountry,
      );
      (mockedMoviesRepository.createMovie as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const createMovie = (): Promise<Movie> =>
        moviesService.createMovie({
          title: mockedMovie.title,
          description: mockedMovie.description,
          wallpaperUrl: mockedMovie.wallpaperUrl,
          pictureUrl: mockedMovie.pictureUrl,
          ageRating: mockedMovie.ageRating,
          rating: mockedMovie.rating,
          status: mockedMovie.status,
          countryId: mockedMovie.countryId,
          year: mockedMovie.year,
          type: mockedMovie.type,
        });

      await expect(createMovie()).resolves.toBe(mockedMovie);
    });
  });

  describe('Update movie', () => {
    it('Should get a bad request error', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrl.mp4',
        pictureUrl: 'https://animezero.ru/videos/pictureUrl.webp',
        ageRating: '6+',
        rating: 9.5,
        status: 'Ongoing',
        countryId: 1,
        year: 2005,
        type: 'Film',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (
        mockedMoviesRepository.getMovieByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedMovie);

      const updateMovie = (): Promise<Movie> =>
        moviesService.updateMovie(1, { title: mockedMovie.title });

      await expect(updateMovie()).rejects.toThrow(BadRequestException);
    });

    it('Should get a country not found error', async () => {
      const updateMovie = (): Promise<Movie> =>
        moviesService.updateMovie(1, {
          title: 'Movie title',
        });

      await expect(updateMovie()).rejects.toThrow(NotFoundException);
    });

    it('Should update a movie', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrl.mp4',
        pictureUrl: 'https://animezero.ru/videos/pictureUrl.webp',
        ageRating: '6+',
        rating: 9.5,
        status: 'Ongoing',
        countryId: 1,
        year: 2005,
        type: 'Film',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      const mockedCountry: Country = {
        id: 1,
        name: 'Russia',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedCountriesService.getCountryById as jest.Mock).mockResolvedValue(
        mockedCountry,
      );
      (mockedMoviesRepository.updateMovie as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const updateMovie = (): Promise<Movie> =>
        moviesService.updateMovie(1, {
          title: mockedMovie.title,
        });

      await expect(updateMovie()).resolves.toBe(mockedMovie);
    });
  });

  describe('Delete movie', () => {
    it('Should delete a movie', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrl.mp4',
        pictureUrl: 'https://animezero.ru/videos/pictureUrl.webp',
        ageRating: '6+',
        rating: 9.5,
        status: 'Ongoing',
        countryId: 1,
        year: 2005,
        type: 'Film',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedMoviesRepository.deleteMovie as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const deleteMovie = (): Promise<Movie> => moviesService.deleteMovie(1);

      await expect(deleteMovie()).resolves.toBe(mockedMovie);
    });
  });
});
