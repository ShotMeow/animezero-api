import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/auth/guards/gqlAuth.guard';

import { UpdateUserInput, User } from '../users.model';
import { UsersService } from '../service/users.service';
import { AuthUser } from '@/auth/decorators/user.decorator';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @AuthUser() user: User,
    @Args('user') data: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(user.id, data);
  }
}
