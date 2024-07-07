import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { TagsService } from '../service/tags.service';
import { TagsResolver } from './tags.resolver';
import type { Tag } from '../tags.model';

describe(`Tags Resolver`, () => {
  let mockedTagsService: TagsService;
  let tagsResolver: TagsResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TagsService, TagsResolver],
    })
      .overrideProvider(TagsService)
      .useValue(mockDeep<TagsService>())
      .compile();

    mockedTagsService = moduleRef.get(TagsService);
    tagsResolver = moduleRef.get(TagsResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(tagsResolver).toBeDefined();
  });

  describe('Get tag by unique input', () => {
    it('Should get a film by id', async () => {
      const mockedTag: Tag = {
        id: 1,
        name: 'Top-100',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedTagsService.getTagById as jest.Mock).mockResolvedValue(mockedTag);

      const getTagById = (): Promise<Tag> => tagsResolver.getTagById(1);

      await expect(getTagById()).resolves.toBe(mockedTag);
    });
  });

  describe('Get Tags', () => {
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
      (mockedTagsService.getTags as jest.Mock).mockResolvedValue(
        mockedTagsList,
      );

      await expect(tagsResolver.getTags()).resolves.toEqual(mockedTagsList);
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
      (mockedTagsService.createTag as jest.Mock).mockResolvedValue(mockedTag);

      const createTag = (): Promise<Tag> => tagsResolver.createTag(mockedTag);

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
      (mockedTagsService.updateTag as jest.Mock).mockResolvedValue(mockedTag);

      const updateTag = (): Promise<Tag> =>
        tagsResolver.updateTag(1, mockedTag);

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
      (mockedTagsService.deleteTag as jest.Mock).mockResolvedValue(mockedTag);

      const deleteTag = (): Promise<Tag> => tagsResolver.deleteTag(1);

      await expect(deleteTag()).resolves.toBe(mockedTag);
    });
  });
});
