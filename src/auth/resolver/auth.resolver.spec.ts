import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { UsersService } from '@/users/service/users.service';
import { User } from '@/users/users.model';
import { AuthResolver } from './auth.resolver';
import { AuthService } from '@/auth/service/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '@/users/repository/users.repository';
import { PrismaService } from '@/database/prisma.service';

describe(`Auth Resolver`, () => {
  let mockedAuthService: AuthService;
  let authResolver: AuthResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthResolver,
        UsersService,
        JwtService,
        UsersRepository,
        PrismaService,
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockDeep<AuthService>())
      .compile();

    mockedAuthService = moduleRef.get(AuthService);
    authResolver = moduleRef.get(AuthResolver);
  });

  describe('Auth user', () => {
    const mockedUser: User = {
      id: 1,
      name: 'username',
      avatarUrl: 'https://animezero.ru/avatarUrl.webp',
      email: 'test@animezero.ru',
      phone: '+79999999999',
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    const authUser = mockedUser;

    it('Should return a current user by auth user', async () => {
      (mockedAuthService.getAuthUser as jest.Mock).mockResolvedValue(
        mockedUser,
      );

      const getAuthUser = (): Promise<User> => authResolver.whoAmI(authUser);

      await expect(getAuthUser()).resolves.toEqual(mockedUser);
    });
  });

  describe('Sign In', () => {
    it('Should sign in user with correct password', async () => {
      (mockedAuthService.signIn as jest.Mock).mockResolvedValue({
        token: 'mockedToken',
      });

      const signIn = (): Promise<{ token: string }> =>
        authResolver.signIn({
          name: 'username',
          password: 'correctPassword',
        });

      await expect(signIn()).resolves.toEqual({ token: 'mockedToken' });
    });
  });

  describe('Sign Un', () => {
    it('Should create a new user', async () => {
      (mockedAuthService.signUp as jest.Mock).mockResolvedValue({
        token: 'mockedToken',
      });

      const signUp = (): Promise<{ token: string }> =>
        authResolver.signUp({
          name: 'username',
          password: 'correctPassword',
        });

      await expect(signUp()).resolves.toEqual({ token: 'mockedToken' });
    });
  });
});
