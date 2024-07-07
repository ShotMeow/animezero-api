import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { MoviesRepository } from '../repository/movies.repository';
import { MoviesService } from './movies.service';
import { Movie } from '../movies.model';

describe(`Movies Service`, () => {
  let mockedMoviesRepository: MoviesRepository;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MoviesService, MoviesRepository],
    })
      .overrideProvider(MoviesRepository)
      .useValue(mockDeep<MoviesRepository>())
      .compile();

    mockedMoviesRepository = moduleRef.get(MoviesRepository);
    moviesService = moduleRef.get(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(moviesService).toBeDefined();
  });

  describe('Get movie by unique input', () => {
    it('Should get a film by id', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
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

  describe('Get Movies', () => {
    it('Should get a list of Movies', async () => {
      const mockedMoviesList: Movie[] = [
        {
          id: 1,
          title: 'Movie title 1',
          description: 'Movie description',
          videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
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
          videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
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
    it('Should create a new movie', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
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
      (mockedMoviesRepository.createMovie as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const createMovie = (): Promise<Movie> =>
        moviesService.createMovie(mockedMovie);

      await expect(createMovie()).resolves.toBe(mockedMovie);
    });
  });

  describe('Update movie', () => {
    it('Should update a movie', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
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
      (mockedMoviesRepository.updateMovie as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const updateMovie = (): Promise<Movie> =>
        moviesService.updateMovie(1, mockedMovie);

      await expect(updateMovie()).resolves.toBe(mockedMovie);
    });
  });

  describe('Delete movie', () => {
    it('Should delete a movie', async () => {
      const mockedMovie: Movie = {
        id: 1,
        title: 'Movie title',
        description: 'Movie description',
        videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
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
