import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/database/service/prisma.service';
import { MoviesRepository } from './movies.repository';
import { Movie } from '../movies.model';

describe(`Movies Repository`, () => {
  let mockedPrismaService: PrismaClient;
  let moviesRepository: MoviesRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MoviesRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    mockedPrismaService = moduleRef.get(PrismaService);
    moviesRepository = moduleRef.get(MoviesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(moviesRepository).toBeDefined();
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
      (mockedPrismaService.movie.findUnique as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const getMovieById = (): Promise<Movie> =>
        moviesRepository.getMovieByUniqueInput({
          where: { id: 1 },
        });

      await expect(getMovieById()).resolves.toBe(mockedMovie);
    });

    it('Should get a film by title', async () => {
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
      (mockedPrismaService.movie.findUnique as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const getMovieByTitle = (): Promise<Movie> =>
        moviesRepository.getMovieByUniqueInput({
          where: { title: 'Movie title' },
        });

      await expect(getMovieByTitle()).resolves.toBe(mockedMovie);
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
      (mockedPrismaService.movie.findMany as jest.Mock).mockResolvedValue(
        mockedMoviesList,
      );

      const getMovies = async (): Promise<Movie[]> => {
        return moviesRepository.getMovies({});
      };

      await expect(getMovies()).resolves.toEqual(mockedMoviesList);
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
      (mockedPrismaService.movie.create as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const createMovie = (): Promise<Movie> =>
        moviesRepository.createMovie({
          data: mockedMovie,
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
      (mockedPrismaService.movie.update as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const updateMovie = (): Promise<Movie> =>
        moviesRepository.updateMovie({
          where: { id: 1 },
          data: mockedMovie,
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
      (mockedPrismaService.movie.delete as jest.Mock).mockResolvedValue(
        mockedMovie,
      );

      const deleteMovie = (): Promise<Movie> =>
        moviesRepository.deleteMovie({
          where: { id: 1 },
        });

      await expect(deleteMovie()).resolves.toBe(mockedMovie);
    });
  });
});
