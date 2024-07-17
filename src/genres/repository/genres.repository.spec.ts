import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/database/service/prisma.service';
import { GenresRepository } from './genres.repository';
import type { Genre } from '../genres.model';

describe(`Genres Repository`, () => {
  let mockedPrismaService: PrismaClient;
  let genresRepository: GenresRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GenresRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    mockedPrismaService = moduleRef.get(PrismaService);
    genresRepository = moduleRef.get(GenresRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(genresRepository).toBeDefined();
  });

  describe('Get genre by unique input', () => {
    it('Should get a genre by id', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.genre.findUnique as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const getGenreById = (): Promise<Genre> =>
        genresRepository.getGenreByUniqueInput({
          where: { id: 1 },
        });

      await expect(getGenreById()).resolves.toBe(mockedGenre);
    });

    it('Should get a genre by name', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.genre.findUnique as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const getGenreByTitle = (): Promise<Genre> =>
        genresRepository.getGenreByUniqueInput({
          where: { name: 'Russia' },
        });

      await expect(getGenreByTitle()).resolves.toBe(mockedGenre);
    });
  });

  describe('Get genre', () => {
    it('Should get a list of genres', async () => {
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
      (mockedPrismaService.genre.findMany as jest.Mock).mockResolvedValue(
        mockedGenresList,
      );

      const getGenres = async (): Promise<Genre[]> => {
        return genresRepository.getGenres({});
      };

      await expect(getGenres()).resolves.toEqual(mockedGenresList);
    });
  });

  describe('Create genre', () => {
    it('Should create a new genre', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.genre.create as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const createGenre = (): Promise<Genre> =>
        genresRepository.createGenre({
          data: {
            name: mockedGenre.name,
          },
        });

      await expect(createGenre()).resolves.toBe(mockedGenre);
    });
  });

  describe('Update genre', () => {
    it('Should update a genre', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.genre.update as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const updateGenre = (): Promise<Genre> =>
        genresRepository.updateGenre({
          where: { id: 1 },
          data: {
            name: mockedGenre.name,
          },
        });

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
      (mockedPrismaService.genre.delete as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const deleteGenre = (): Promise<Genre> =>
        genresRepository.deleteGenre({
          where: { id: 1 },
        });

      await expect(deleteGenre()).resolves.toBe(mockedGenre);
    });
  });
});
