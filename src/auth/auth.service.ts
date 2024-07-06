import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/users/users.service';
import { PrismaService } from '@/database/prisma.service';

import { SignInInput, SignUpInput } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getAuthUser(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async signIn(data: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        name: data.name,
      },
    });

    if (!user) {
      throw new NotFoundException('Неверный E-mail или пароль');
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Пароли не совпадают');
    }

    return {
      token: this.jwtService.sign({ userId: user.id, name: user.name }),
    };
  }

  async signUp(data: SignUpInput) {
    data.password = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.createUser(data);

    return {
      token: this.jwtService.sign({ userId: user.id, name: user.name }),
    };
  }
}
