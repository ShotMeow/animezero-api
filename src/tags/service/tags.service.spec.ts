import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { TagsRepository } from '../repository/tags.repository';
import { TagsService } from './tags.service';
import type { Tag } from '../tags.model';

describe(`Tags Service`, () => {
  let mockedTagsRepository: TagsRepository;
  let tagsService: TagsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TagsService, TagsRepository],
    })
      .overrideProvider(TagsRepository)
      .useValue(mockDeep<TagsRepository>())
      .compile();

    mockedTagsRepository = moduleRef.get(TagsRepository);
    tagsService = moduleRef.get(TagsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(tagsService).toBeDefined();
  });

  describe('Get tag by unique input', () => {
    it('Should get a not found error', async () => {
      const getTagById = (): Promise<Tag> => tagsService.getTagById(1);

      await expect(getTagById()).rejects.toThrow(NotFoundException);
    });

    it('Should get a tag by id', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedTagsRepository.getTagByUniqueInput as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const getTagById = (): Promise<Tag> => tagsService.getTagById(1);

      await expect(getTagById()).resolves.toBe(mockedTag);
    });
  });

  describe('Get tags', () => {
    it('Should get a list of Tags', async () => {
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
      (mockedTagsRepository.getTags as jest.Mock).mockResolvedValue(
        mockedTagsList,
      );

      await expect(tagsService.getTags()).resolves.toEqual(mockedTagsList);
    });
  });

  describe('Create tag', () => {
    it('Should get a bad request error', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedTagsRepository.getTagByUniqueInput as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const createTag = (): Promise<Tag> =>
        tagsService.createTag({
          name: mockedTag.name,
        });

      await expect(createTag()).rejects.toThrow(BadRequestException);
    });

    it('Should create a new tag', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedTagsRepository.createTag as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const createTag = (): Promise<Tag> =>
        tagsService.createTag({ name: mockedTag.name });

      await expect(createTag()).resolves.toBe(mockedTag);
    });
  });

  describe('Update tag', () => {
    it('Should get a bad request error', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedTagsRepository.getTagByUniqueInput as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const updateTag = (): Promise<Tag> =>
        tagsService.updateTag(1, {
          name: mockedTag.name,
        });

      await expect(updateTag()).rejects.toThrow(BadRequestException);
    });

    it('Should update a tag', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedTagsRepository.updateTag as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const updateTag = (): Promise<Tag> =>
        tagsService.updateTag(1, { name: mockedTag.name });

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
      (mockedTagsRepository.deleteTag as jest.Mock).mockResolvedValue(
        mockedTag,
      );

      const deleteTag = (): Promise<Tag> => tagsService.deleteTag(1);

      await expect(deleteTag()).resolves.toBe(mockedTag);
    });
  });
});
