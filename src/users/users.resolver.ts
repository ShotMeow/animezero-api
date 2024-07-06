import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput, User } from '@/users/users.model';
import { UsersService } from '@/users/users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('user') data: CreateUserInput,
  ) {
    return this.usersService.updateUser(id, data);
  }
}
