import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/database/service/prisma.service';
import { EpisodesRepository } from './episodes.repository';
import { Episode } from '../episodes.model';

describe(`Episodes Repository`, () => {
  let mockedPrismaService: PrismaClient;
  let episodesRepository: EpisodesRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EpisodesRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    mockedPrismaService = moduleRef.get(PrismaService);
    episodesRepository = moduleRef.get(EpisodesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(episodesRepository).toBeDefined();
  });

  describe('Get episode by unique input', () => {
    it('Should get a film by id', async () => {
      const mockedEpisode: Episode = {
        id: 1,
        name: 'Episode title',
        description: 'Episode description',
        videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
        voiceover: 'Дубляж',
        episode: 1,
        season: 1,
        openingStart: '00:36',
        openingEnd: '01:32',
        endingStart: '21:54',
        endingEnd: '22:32',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.episode.findUnique as jest.Mock).mockResolvedValue(
        mockedEpisode,
      );

      const getEpisodeById = (): Promise<Episode> =>
        episodesRepository.getEpisodeByUniqueInput({
          where: { id: 1 },
        });

      await expect(getEpisodeById()).resolves.toBe(mockedEpisode);
    });

    it('Should get a film by title', async () => {
      const mockedEpisode: Episode = {
        id: 1,
        name: 'Episode title',
        description: 'Episode description',
        videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
        voiceover: 'Дубляж',
        episode: 1,
        season: 1,
        openingStart: '00:36',
        openingEnd: '01:32',
        endingStart: '21:54',
        endingEnd: '22:32',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.episode.findUnique as jest.Mock).mockResolvedValue(
        mockedEpisode,
      );

      const getEpisodeByTitle = (): Promise<Episode> =>
        episodesRepository.getEpisodeByUniqueInput({
          where: { name: mockedEpisode.name },
        });

      await expect(getEpisodeByTitle()).resolves.toBe(mockedEpisode);
    });
  });

  describe('Get episodes', () => {
    it('Should get a list of Episodes', async () => {
      const mockedEpisodesList: Episode[] = [
        {
          id: 1,
          name: 'Episode title',
          description: 'Episode description',
          videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
          voiceover: 'Дубляж',
          episode: 1,
          season: 1,
          openingStart: '00:36',
          openingEnd: '01:32',
          endingStart: '21:54',
          endingEnd: '22:32',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 2,
          name: 'Episode title 2',
          description: 'Episode description 2',
          videoUrl: 'https://animezero.ru/videos/videoUrlTwo.mp4',
          voiceover: 'Дубляж',
          episode: 2,
          season: 1,
          openingStart: '00:34',
          openingEnd: '01:36',
          endingStart: '21:51',
          endingEnd: '22:34',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ];
      (mockedPrismaService.episode.findMany as jest.Mock).mockResolvedValue(
        mockedEpisodesList,
      );

      const getEpisodes = async (): Promise<Episode[]> => {
        return episodesRepository.getEpisodes({});
      };

      await expect(getEpisodes()).resolves.toEqual(mockedEpisodesList);
    });
  });

  describe('Create episode', () => {
    it('Should create a new episode', async () => {
      const mockedEpisode: Episode = {
        id: 1,
        name: 'Episode title',
        description: 'Episode description',
        videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
        voiceover: 'Дубляж',
        episode: 1,
        season: 1,
        openingStart: '00:36',
        openingEnd: '01:32',
        endingStart: '21:54',
        endingEnd: '22:32',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.episode.create as jest.Mock).mockResolvedValue(
        mockedEpisode,
      );

      const createEpisode = (): Promise<Episode> =>
        episodesRepository.createEpisode({
          movieId: 1,
          data: {
            name: mockedEpisode.name,
            description: mockedEpisode.description,
            videoUrl: mockedEpisode.videoUrl,
            voiceover: mockedEpisode.voiceover,
            episode: mockedEpisode.episode,
            season: mockedEpisode.season,
            openingStart: mockedEpisode.openingStart,
            openingEnd: mockedEpisode.openingEnd,
            endingStart: mockedEpisode.endingStart,
            endingEnd: mockedEpisode.endingEnd,
          },
        });

      await expect(createEpisode()).resolves.toBe(mockedEpisode);
    });
  });

  describe('Update episode', () => {
    it('Should update a episode', async () => {
      const mockedEpisode: Episode = {
        id: 1,
        name: 'Episode title',
        description: 'Episode description',
        videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
        voiceover: 'Дубляж',
        episode: 1,
        season: 1,
        openingStart: '00:36',
        openingEnd: '01:32',
        endingStart: '21:54',
        endingEnd: '22:32',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.episode.update as jest.Mock).mockResolvedValue(
        mockedEpisode,
      );

      const updateEpisode = (): Promise<Episode> =>
        episodesRepository.updateEpisode({
          where: { id: 1 },
          data: {
            name: mockedEpisode.name,
          },
        });

      await expect(updateEpisode()).resolves.toBe(mockedEpisode);
    });
  });

  describe('Delete episode', () => {
    it('Should delete a episode', async () => {
      const mockedEpisode: Episode = {
        id: 1,
        name: 'Episode title',
        description: 'Episode description',
        videoUrl: 'https://animezero.ru/videos/videoUrl.mp4',
        voiceover: 'Дубляж',
        episode: 1,
        season: 1,
        openingStart: '00:36',
        openingEnd: '01:32',
        endingStart: '21:54',
        endingEnd: '22:32',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.episode.delete as jest.Mock).mockResolvedValue(
        mockedEpisode,
      );

      const deleteEpisode = (): Promise<Episode> =>
        episodesRepository.deleteEpisode({
          where: { id: 1 },
        });

      await expect(deleteEpisode()).resolves.toBe(mockedEpisode);
    });
  });
});
