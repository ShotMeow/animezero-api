import { Test } from '@nestjs/testing';
import { mockDeep } from 'jest-mock-extended';

import { UsersService } from '../service/users.service';
import { UsersResolver } from './users.resolver';
import type { User } from '../users.model';

describe(`Users Resolver`, () => {
  let mockedUsersService: UsersService;
  let usersResolver: UsersResolver;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService, UsersResolver],
    })
      .overrideProvider(UsersService)
      .useValue(mockDeep<UsersService>())
      .compile();

    mockedUsersService = moduleRef.get(UsersService);
    usersResolver = moduleRef.get(UsersResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(usersResolver).toBeDefined();
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
      (mockedUsersService.updateUser as jest.Mock).mockResolvedValue(
        mockedUser,
      );

      const updateUser = (): Promise<User> =>
        usersResolver.updateUser(1, {
          email: mockedUser.email,
        });

      await expect(updateUser()).resolves.toBe(mockedUser);
    });
  });
});
