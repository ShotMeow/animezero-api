import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/database/service/prisma.service';
import { UsersRepository } from './users.repository';
import { User } from '../users.model';

describe(`Users Repository`, () => {
  let mockedPrismaService: PrismaClient;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersRepository, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    mockedPrismaService = moduleRef.get(PrismaService);
    usersRepository = moduleRef.get(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('Get user by unique input', () => {
    const mockedUser: User = {
      id: 1,
      name: 'username',
      avatarUrl: 'https://animezero.ru/avatarUrl.webp',
      email: 'test@animezero.ru',
      phone: '+79999999999',
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    it('Should get user by id', async () => {
      (mockedPrismaService.user.findUnique as jest.Mock).mockResolvedValue(
        mockedUser,
      );
      const getUserById = (): Promise<User> =>
        usersRepository.getUserByUniqueInput({ where: { id: mockedUser.id } });

      await expect(getUserById()).resolves.toBe(mockedUser);
    });

    it('Should get user by name', async () => {
      (mockedPrismaService.user.findUnique as jest.Mock).mockResolvedValue(
        mockedUser,
      );
      const getUserByName = (): Promise<User> =>
        usersRepository.getUserByUniqueInput({
          where: { name: mockedUser.name },
        });

      await expect(getUserByName()).resolves.toBe(mockedUser);
    });

    it('Should get user by email', async () => {
      (mockedPrismaService.user.findUnique as jest.Mock).mockResolvedValue(
        mockedUser,
      );
      const getUserByEmail = (): Promise<User> =>
        usersRepository.getUserByUniqueInput({
          where: { email: mockedUser.email },
        });

      await expect(getUserByEmail()).resolves.toBe(mockedUser);
    });

    it('Should get user by phone', async () => {
      (mockedPrismaService.user.findUnique as jest.Mock).mockResolvedValue(
        mockedUser,
      );
      const getUserByPhone = (): Promise<User> =>
        usersRepository.getUserByUniqueInput({
          where: { phone: mockedUser.phone },
        });

      await expect(getUserByPhone()).resolves.toBe(mockedUser);
    });
  });

  describe('Create user', () => {
    it('Should create a new user', async () => {
      const mockedUser: User = {
        id: 1,
        name: 'username',
        avatarUrl: 'https://animezero.ru/avatarUrl.webp',
        email: 'test@animezero.ru',
        phone: '+79999999999',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.user.create as jest.Mock).mockResolvedValue(
        mockedUser,
      );

      const createUser = (): Promise<User> =>
        usersRepository.createUser({
          data: {
            name: mockedUser.name,
            email: mockedUser.email,
            password: 'test_password',
          },
        });

      await expect(createUser()).resolves.toBe(mockedUser);
    });
  });

  describe('Update user', () => {
    it('Should update a user', async () => {
      const mockedUser: User = {
        id: 1,
        name: 'username',
        avatarUrl: 'https://animezero.ru/avatarUrl.webp',
        email: 'test@animezero.ru',
        phone: '+79999999999',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      (mockedPrismaService.user.update as jest.Mock).mockResolvedValue(
        mockedUser,
      );

      const updateUser = (): Promise<User> =>
        usersRepository.updateUser({
          where: { id: 1 },
          data: {
            email: mockedUser.email,
          },
        });

      await expect(updateUser()).resolves.toBe(mockedUser);
    });
  });
});
