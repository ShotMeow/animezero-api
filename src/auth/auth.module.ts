import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@/users/users.module';
import { PrismaModule } from '@/database/prisma.module';

import { AuthService } from './service/auth.service';
import { AuthResolver } from './resolver/auth.resolver';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UsersModule,
    PrismaModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
