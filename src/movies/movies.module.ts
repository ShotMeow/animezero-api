import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { MoviesRepository } from './repository/movies.repository';
import { MoviesService } from './service/movies.service';
import { MoviesResolver } from './resolver/movies.resolver';
import { CountriesModule } from '@/countries/countries.module';

@Module({
  imports: [PrismaModule, CountriesModule],
  providers: [MoviesRepository, MoviesService, MoviesResolver],
})
export class MoviesModule {}
