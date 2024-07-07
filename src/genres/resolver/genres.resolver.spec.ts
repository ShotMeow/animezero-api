import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { GenresService } from '../service/genres.service';
import { GenresResolver } from './genres.resolver';
import type { Genre } from '../genres.model';

describe(`Genres Resolver`, () => {
  let mockedGenresService: GenresService;
  let genresResolver: GenresResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GenresService, GenresResolver],
    })
      .overrideProvider(GenresService)
      .useValue(mockDeep<GenresService>())
      .compile();

    mockedGenresService = moduleRef.get(GenresService);
    genresResolver = moduleRef.get(GenresResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(genresResolver).toBeDefined();
  });

  describe('Get genre by unique input', () => {
    it('Should get a film by id', async () => {
      const mockedGenre: Genre = {
        id: 1,
        name: 'Comedy',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedGenresService.getGenreById as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const getGenreById = (): Promise<Genre> => genresResolver.getGenreById(1);

      await expect(getGenreById()).resolves.toBe(mockedGenre);
    });
  });

  describe('Get Genres', () => {
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
      (mockedGenresService.getGenres as jest.Mock).mockResolvedValue(
        mockedGenresList,
      );

      await expect(genresResolver.getGenres()).resolves.toEqual(
        mockedGenresList,
      );
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
      (mockedGenresService.createGenre as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const createGenre = (): Promise<Genre> =>
        genresResolver.createGenre(mockedGenre);

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
      (mockedGenresService.updateGenre as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const updateGenre = (): Promise<Genre> =>
        genresResolver.updateGenre(1, mockedGenre);

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
      (mockedGenresService.deleteGenre as jest.Mock).mockResolvedValue(
        mockedGenre,
      );

      const deleteGenre = (): Promise<Genre> => genresResolver.deleteGenre(1);

      await expect(deleteGenre()).resolves.toBe(mockedGenre);
    });
  });
});
