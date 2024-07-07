import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { UsersRepository } from './repository/users.repository';
import { UsersService } from './service/users.service';
import { UsersResolver } from './resolver/users.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UsersRepository, UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
