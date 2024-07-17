import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { EpisodesRepository } from './repository/episodes.repository';
import { EpisodesService } from './service/episodes.service';
import { EpisodesResolver } from './resolver/episodes.resolver';

@Module({
  imports: [PrismaModule],
  providers: [EpisodesRepository, EpisodesService, EpisodesResolver],
})
export class EpisodesModule {}
