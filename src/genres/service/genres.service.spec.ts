import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { GenresRepository } from '../repository/genres.repository';
import { GenresService } from './genres.service';
import type { Genre } from '../genres.model';

describe(`Genres Service`, () => {
  let mockedGenresRepository: GenresRepository;
  let genresService: GenresService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GenresService, GenresRepository],
    })
      .overrideProvider(GenresRepository)
      .useValue(mockDeep<GenresRepository>())
      .compile();

    mockedGenresRepository = moduleRef.get(GenresRepository);
    genresService = moduleRef.get(GenresService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(genresService).toBeDefined();
  });

  describe('Get genre by unique input', () => {
    it('Should get a not found error', async () => {
      const getGenreById = (): Promise<Genre> => genresService.getGenreById(1);

      await expect(getGenreById()).rejects.toThrow(NotFoundException);
    });

    it('Should get a genre by id', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (
        mockedGenresRepository.getGenreByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedGenre);

      const getGenreById = (): Promise<Genre> => genresService.getGenreById(1);

      await expect(getGenreById()).resolves.toBe(mockedGenre);
    });
  });

  describe('Get genres', () => {
    it('Should get a list of Genres', async () => {
      const mockedGenresList: Genre[] = [
        {
          id: 1,
          name: 'Comedy',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Fantasy',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];
      (mockedGenresRepository.getGenres as jest.Mock).mockResolvedValue(
        mockedGenresList,
      );

      await expect(genresService.getGenres()).resolves.toEqual(
        mockedGenresList,
      );
    });
  });

  describe('Create genre', () => {
    it('Should get a bad request error', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (
        mockedGenresRepository.getGenreByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedGenre);

      const createGenre = (): Promise<Genre> =>
        genresService.createGenre({
          name: mockedGenre.name,
        });

      await expect(createGenre()).rejects.toThrow(BadRequestException);
    });

    it('Should create a new genre', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedGenresRepository.createGenre as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const createGenre = (): Promise<Genre> =>
        genresService.createGenre({
          name: 'Comedy',
        });

      await expect(createGenre()).resolves.toBe(mockedGenre);
    });
  });

  describe('Update genre', () => {
    it('Should get a bad request error', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (
        mockedGenresRepository.getGenreByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedGenre);

      const updateGenre = (): Promise<Genre> =>
        genresService.updateGenre(1, { name: mockedGenre.name });

      await expect(updateGenre()).rejects.toThrow(BadRequestException);
    });

    it('Should update a genre', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedGenresRepository.updateGenre as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const updateGenre = (): Promise<Genre> =>
        genresService.updateGenre(1, mockedGenre);

      await expect(updateGenre()).resolves.toBe(mockedGenre);
    });
  });

  describe('Delete genre', () => {
    it('Should delete a genre', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedGenresRepository.deleteGenre as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const deleteGenre = (): Promise<Genre> => genresService.deleteGenre(1);

      await expect(deleteGenre()).resolves.toBe(mockedGenre);
    });
  });
});
