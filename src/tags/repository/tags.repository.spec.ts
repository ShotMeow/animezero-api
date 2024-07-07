import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/database/service/prisma.service';
import { TagsRepository } from './tags.repository';
import type { Tag } from '../tags.model';

describe(`Tags Repository`, () => {
  let mockedPrismaService: PrismaClient;
  let tagsRepository: TagsRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TagsRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    mockedPrismaService = moduleRef.get(PrismaService);
    tagsRepository = moduleRef.get(TagsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(tagsRepository).toBeDefined();
  });

  describe('Get tag by unique input', () => {
    it('Should get a tag by id', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.tag.findUnique as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const getTagById = (): Promise<Tag> =>
        tagsRepository.getTagByUniqueInput({
          where: { id: 1 },
        });

      await expect(getTagById()).resolves.toBe(mockedTag);
    });

    it('Should get a tag by name', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.tag.findUnique as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const getTagByTitle = (): Promise<Tag> =>
        tagsRepository.getTagByUniqueInput({
          where: { name: 'Russia' },
        });

      await expect(getTagByTitle()).resolves.toBe(mockedTag);
    });
  });

  describe('Get Tag', () => {
    it('Should get a list of tags', async () => {
      const mockedTagsList: Tag[] = [
        {
          id: 1,
          name: 'Top-100',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'For child',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];
      (mockedPrismaService.tag.findMany as jest.Mock).mockResolvedValue(
        mockedTagsList,
      );

      const getTags = async (): Promise<Tag[]> => {
        return tagsRepository.getTags({});
      };

      await expect(getTags()).resolves.toEqual(mockedTagsList);
    });
  });

  describe('Create tag', () => {
    it('Should create a new tag', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.tag.create as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const createTag = (): Promise<Tag> =>
        tagsRepository.createTag({
          data: mockedTag,
        });

      await expect(createTag()).resolves.toBe(mockedTag);
    });
  });

  describe('Update tag', () => {
    it('Should update a tag', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.tag.update as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const updateTag = (): Promise<Tag> =>
        tagsRepository.updateTag({
          where: { id: 1 },
          data: mockedTag,
        });

      await expect(updateTag()).resolves.toBe(mockedTag);
    });
  });

  describe('Delete tag', () => {
    it('Should delete a tag', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.tag.delete as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const deleteTag = (): Promise<Tag> =>
        tagsRepository.deleteTag({
          where: { id: 1 },
        });

      await expect(deleteTag()).resolves.toBe(mockedTag);
    });
  });
});
