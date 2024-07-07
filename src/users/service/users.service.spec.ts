import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { UsersRepository } from '../repository/users.repository';
import { User } from '../users.model';
import { UsersService } from './users.service';

describe(`Users Service`, () => {
  let mockedUsersRepository: UsersRepository;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersRepository, UsersService],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockDeep<UsersRepository>())
      .compile();

    mockedUsersRepository = moduleRef.get(UsersRepository);
    usersService = moduleRef.get(UsersService);
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
      (
        mockedUsersRepository.getUserByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedUser);
      const getUserById = (): Promise<User> =>
        usersService.getUserById(mockedUser.id);

      await expect(getUserById()).resolves.toBe(mockedUser);
    });

    it('Should get user by name', async () => {
      (
        mockedUsersRepository.getUserByUniqueInput as jest.Mock
      ).mockResolvedValue(mockedUser);
      const getUserByName = (): Promise<User> =>
        usersService.getUserByName(mockedUser.name);

      await expect(getUserByName()).resolves.toBe(mockedUser);
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
      (mockedUsersRepository.createUser as jest.Mock).mockResolvedValue(
        mockedUser,
      );

      const createUser = (): Promise<User> =>
        usersService.createUser({
          ...mockedUser,
          password: 'test_password',
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
      (mockedUsersRepository.updateUser as jest.Mock).mockResolvedValue(
        mockedUser,
      );

      const updateUser = (): Promise<User> =>
        usersService.updateUser(1, {
          email: mockedUser.email,
        });

      await expect(updateUser()).resolves.toBe(mockedUser);
    });
  });
});
