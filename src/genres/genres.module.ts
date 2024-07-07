import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { GenresService } from './service/genres.service';
import { GenresResolver } from './resolver/genres.resolver';
import { GenresRepository } from './repository/genres.repository';

@Module({
  imports: [PrismaModule],
  providers: [GenresService, GenresResolver, GenresRepository],
})
export class GenresModule {}
