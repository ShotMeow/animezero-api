import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput, User } from '@/users/users.model';
import { UsersRepository } from '@/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async createUser(data: CreateUserInput): Promise<User> {
    return this.repository.createUser({ data });
  }

  async updateUser(id: number, data: UpdateUserInput) {
    return this.repository.updateUser({ where: { id }, data });
  }
}
