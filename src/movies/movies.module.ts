import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';

import { MoviesRepository } from './movies.repository';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';

@Module({
  imports: [PrismaModule],
  providers: [MoviesRepository, MoviesService, MoviesResolver],
})
export class MoviesModule {}
