import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MoviesRepository } from '../repository/movies.repository';
import type {
  CreateMovieInput,
  Movie,
  UpdateMovieInput,
} from '../movies.model';
import { CountriesService } from '@/countries/service/countries.service';
import { Options } from '@/utils/base.model';

@Injectable()
export class MoviesService {
  constructor(
    private moviesRepository: MoviesRepository,
    private countriesService: CountriesService,
  ) {}

  async getMovieById(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.getMovieByUniqueInput({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundException('Такого фильма не существует.');
    }

    return movie;
  }

  async getMovies(options?: Options): Promise<Movie[]> {
    const haveOrderBy = options && options.orderBy;
    return this.moviesRepository.getMovies({
      ...options,
      orderBy: haveOrderBy && {
        updatedAt: options.orderBy,
      },
    });
  }

  async createMovie(data: CreateMovieInput) {
    const existedMovie = await this.moviesRepository.getMovieByUniqueInput({
      where: {
        title: data.title,
      },
    });

    if (existedMovie) {
      throw new BadRequestException(`Фильм «${data.title}» уже существует.`);
    }

    const country = await this.countriesService.getCountryById(data.countryId);
    if (!country) {
      throw new NotFoundException(
        `Страны с идентификатором «${data.countryId}» не существует.`,
      );
    }

    delete data.countryId;

    return this.moviesRepository.createMovie({
      data: {
        ...data,
        country: {
          connect: {
            id: country.id,
          },
        },
      },
    });
  }

  async updateMovie(id: number, data: UpdateMovieInput) {
    const existedMovie = await this.moviesRepository.getMovieByUniqueInput({
      where: {
        title: data.title,
      },
    });

    if (existedMovie) {
      throw new BadRequestException(`Фильм «${data.title}» уже существует`);
    }

    const country = await this.countriesService.getCountryById(data.countryId);
    if (!country) {
      throw new NotFoundException(
        `Страны с идентификатором «${data.countryId}» не существует.`,
      );
    }

    delete data.countryId;

    return this.moviesRepository.updateMovie({
      where: { id },
      data: {
        ...data,
        country: {
          connect: {
            id: country.id,
          },
        },
      },
    });
  }

  async deleteMovie(id: number) {
    return this.moviesRepository.deleteMovie({ where: { id } });
  }
}
