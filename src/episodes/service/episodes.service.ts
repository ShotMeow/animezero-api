import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EpisodesRepository } from '../repository/episodes.repository';
import {
  CreateEpisodeInput,
  Episode,
  UpdateEpisodeInput,
} from '../episodes.model';
import { Options } from '@/utils/base.model';

@Injectable()
export class EpisodesService {
  constructor(private episodesRepository: EpisodesRepository) {}

  async getEpisodeById(id: number): Promise<Episode> {
    const episode = await this.episodesRepository.getEpisodeByUniqueInput({
      where: {
        id,
      },
    });

    if (!episode) {
      throw new NotFoundException('Такого эпизода не существует');
    }

    return episode;
  }

  async getEpisodes(options?: Options): Promise<Episode[]> {
    const haveOrderBy = options && options.orderBy;

    return this.episodesRepository.getEpisodes({
      ...options,
      orderBy: haveOrderBy && {
        updatedAt: options.orderBy,
      },
    });
  }

  async createEpisode(movieId: number, data: CreateEpisodeInput) {
    const existedEpisode =
      await this.episodesRepository.getEpisodeByUniqueInput({
        where: {
          name: data.name,
        },
      });

    if (existedEpisode) {
      throw new BadRequestException(`Эпизод «${data.name}» уже существует`);
    }

    return this.episodesRepository.createEpisode({ movieId, data });
  }

  async updateEpisode(id: number, data: UpdateEpisodeInput) {
    const existedEpisode =
      await this.episodesRepository.getEpisodeByUniqueInput({
        where: {
          name: data.name,
        },
      });

    if (existedEpisode) {
      throw new BadRequestException(`Эпизод «${data.name}» уже существует`);
    }

    return this.episodesRepository.updateEpisode({ where: { id }, data });
  }

  async deleteEpisode(id: number) {
    return this.episodesRepository.deleteEpisode({ where: { id } });
  }
}
