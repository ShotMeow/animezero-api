import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { MoviesRepository } from '@/movies/movies.repository';
import { MoviesService } from '@/movies/movies.service';
import { MoviesResolver } from '@/movies/movies.resolver';

@Module({
  imports: [PrismaModule],
  providers: [MoviesRepository, MoviesService, MoviesResolver],
  exports: [MoviesService],
})
export class MoviesModule {}
