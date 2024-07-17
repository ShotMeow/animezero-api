import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { EpisodesService } from '../service/episodes.service';
import { EpisodesResolver } from './episodes.resolver';
import type { Episode } from '../episodes.model';

describe(`Episodes Resolver`, () => {
  let mockedEpisodesService: EpisodesService;
  let episodesResolver: EpisodesResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [EpisodesService, EpisodesResolver],
    })
      .overrideProvider(EpisodesService)
      .useValue(mockDeep<EpisodesService>())
      .compile();

    mockedEpisodesService = moduleRef.get(EpisodesService);
    episodesResolver = moduleRef.get(EpisodesResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(episodesResolver).toBeDefined();
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
      (mockedEpisodesService.getEpisodeById as jest.Mock).mockResolvedValue(
        mockedEpisode,
      );

      const getEpisodeById = (): Promise<Episode> =>
        episodesResolver.getEpisodeById(1);

      await expect(getEpisodeById()).resolves.toBe(mockedEpisode);
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
      (mockedEpisodesService.getEpisodes as jest.Mock).mockResolvedValue(
        mockedEpisodesList,
      );

      await expect(episodesResolver.getEpisodes()).resolves.toEqual(
        mockedEpisodesList,
      );
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
      (mockedEpisodesService.createEpisode as jest.Mock).mockResolvedValue(
        mockedEpisode,
      );

      const createEpisode = (): Promise<Episode> =>
        episodesResolver.createEpisode(1, {
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
      (mockedEpisodesService.updateEpisode as jest.Mock).mockResolvedValue(
        mockedEpisode,
      );

      const updateEpisode = (): Promise<Episode> =>
        episodesResolver.updateEpisode(1, {
          name: mockedEpisode.name,
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
      (mockedEpisodesService.deleteEpisode as jest.Mock).mockResolvedValue(
        mockedEpisode,
      );

      const deleteEpisode = (): Promise<Episode> =>
        episodesResolver.deleteEpisode(1);

      await expect(deleteEpisode()).resolves.toBe(mockedEpisode);
    });
  });
});
