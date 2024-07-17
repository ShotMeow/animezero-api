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

  async getMovies(): Promise<Movie[]> {
    return this.moviesRepository.getMovies({});
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
