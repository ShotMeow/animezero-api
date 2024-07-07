import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/users/service/users.service';
import type { User } from '@/users/users.model';
import { AuthService } from './auth.service';

jest.mock('bcrypt');

describe(`Auth Service`, () => {
  let mockedUsersService: UsersService;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService, AuthService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(mockDeep<UsersService>())
      .compile();

    mockedUsersService = moduleRef.get(UsersService);
    authService = moduleRef.get(AuthService);
    jwtService = moduleRef.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Get Auth User', () => {
    const mockedUser: User = {
      id: 1,
      name: 'username',
      avatarUrl: 'https://animezero.ru/avatarUrl.webp',
      email: 'test@animezero.ru',
      phone: '+79999999999',
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    it('Should return a user by id', async () => {
      const userId = mockedUser.id;

      (mockedUsersService.getUserById as jest.Mock).mockResolvedValue(
        mockedUser,
      );

      const getAuthUser = (): Promise<User> => authService.getAuthUser(userId);

      await expect(getAuthUser()).resolves.toEqual(mockedUser);
    });
  });

  describe('Sign In', () => {
    const mockedUser: User = {
      id: 1,
      name: 'username',
      avatarUrl: 'https://animezero.ru/avatarUrl.webp',
      email: 'test@animezero.ru',
      phone: '+79999999999',
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    it('Should sign in user with correct password', async () => {
      (mockedUsersService.getUserByName as jest.Mock).mockResolvedValue({
        ...mockedUser,
        password: 'hashedPassword',
      });

      const signIn = (): Promise<{ token: string }> =>
        authService.signIn({
          name: 'username',
          password: 'correctPassword',
        });

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockedToken');

      await expect(signIn()).resolves.toEqual({ token: 'mockedToken' });
    });

    it('Should sign in user with incorrect password', async () => {
      (mockedUsersService.getUserByName as jest.Mock).mockResolvedValue({
        ...mockedUser,
        password: 'hashedPassword',
      });

      const signIn = (): Promise<{ token: string }> =>
        authService.signIn({
          name: 'username',
          password: 'incorrectPassword',
        });

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(signIn()).rejects.toThrow(UnauthorizedException);
    });

    it('Should throw NotFoundException if user is not found', async () => {
      (mockedUsersService.getUserByName as jest.Mock).mockResolvedValue(null);

      const signIn = (): Promise<{ token: string }> =>
        authService.signIn({
          name: 'username',
          password: 'password',
        });

      await expect(signIn()).rejects.toThrow(NotFoundException);
    });
  });

  describe('Sign Up', () => {
    const mockedUser: User = {
      id: 1,
      name: 'username',
      avatarUrl: 'https://animezero.ru/avatarUrl.webp',
      email: 'test@animezero.ru',
      phone: '+79999999999',
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    it('Should hash the password and create a new user', async () => {
      (mockedUsersService.createUser as jest.Mock).mockResolvedValue({
        ...mockedUser,
        password: 'hashedPassword',
      });
      const signUpData = {
        name: mockedUser.name,
        email: mockedUser.email,
        phone: mockedUser.phone,
        password: 'plainPassword',
      };

      const signUp = (): Promise<{ token: string }> =>
        authService.signUp(signUpData);

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockedToken');

      await expect(signUp()).resolves.toEqual({ token: 'mockedToken' });
      expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 10);
      expect(mockedUsersService.createUser).toHaveBeenCalledWith({
        ...signUpData,
        password: 'hashedPassword',
      });
    });
  });
});
