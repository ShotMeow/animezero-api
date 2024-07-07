import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { TagsService } from './service/tags.service';
import { TagsResolver } from './resolver/tags.resolver';
import { TagsRepository } from './repository/tags.repository';

@Module({
  imports: [PrismaModule],
  providers: [TagsService, TagsResolver, TagsRepository],
})
export class TagsModule {}
