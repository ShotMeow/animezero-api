import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';
import { UsersRepository } from '@/users/users.repository';
import { UsersService } from '@/users/users.service';
import { UsersResolver } from '@/users/users.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UsersRepository, UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
