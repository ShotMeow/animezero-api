import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserInput, UpdateUserInput } from '../users.model';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async getUserById(id: number): Promise<User> {
    return this.repository.getUserByUniqueInput({ where: { id } });
  }

  async getUserByName(name: string): Promise<User> {
    return this.repository.getUserByUniqueInput({ where: { name } });
  }

  async createUser(data: CreateUserInput): Promise<User> {
    return this.repository.createUser({ data });
  }

  async updateUser(id: number, data: UpdateUserInput) {
    return this.repository.updateUser({ where: { id }, data });
  }
}
