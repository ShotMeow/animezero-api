import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { MoviesService } from '../service/movies.service';
import { MoviesResolver } from './movies.resolver';
import type { Movie } from '../movies.model';

describe(`Movies Resolver`, () => {
  let mockedMoviesService: MoviesService;
  let moviesResolver: MoviesResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MoviesService, MoviesResolver],
    })
      .overrideProvider(MoviesService)
      .useValue(mockDeep<MoviesService>())
      .compile();

    mockedMoviesService = moduleRef.get(MoviesService);
    moviesResolver = moduleRef.get(MoviesResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(moviesResolver).toBeDefined();
  });

  describe('Get movie by unique input', () => {
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
      (mockedMoviesService.getMovieById as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const getMovieById = (): Promise<Movie> => moviesResolver.getMovieById(1);

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
          wallpaperUrl: 'https://animezero.ru/videos/wallpaperUrlTwo.mp4',
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
      (mockedMoviesService.getMovies as jest.Mock).mockResolvedValue(
        mockedMoviesList,
      );

      await expect(moviesResolver.getMovies()).resolves.toEqual(
        mockedMoviesList,
      );
    });
  });

  describe('Create movie', () => {
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
      (mockedMoviesService.createMovie as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const createMovie = (): Promise<Movie> =>
        moviesResolver.createMovie({
          title: mockedMovie.title,
          description: mockedMovie.description,
          wallpaperUrl: mockedMovie.wallpaperUrl,
          pictureUrl: mockedMovie.pictureUrl,
          ageRating: mockedMovie.ageRating,
          rating: mockedMovie.rating,
          status: mockedMovie.status,
          year: mockedMovie.year,
          type: mockedMovie.type,
        });

      await expect(createMovie()).resolves.toBe(mockedMovie);
    });
  });

  describe('Update movie', () => {
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
      (mockedMoviesService.updateMovie as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const updateMovie = (): Promise<Movie> =>
        moviesResolver.updateMovie(1, {
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
      (mockedMoviesService.deleteMovie as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const deleteMovie = (): Promise<Movie> => moviesResolver.deleteMovie(1);

      await expect(deleteMovie()).resolves.toBe(mockedMovie);
    });
  });
});
