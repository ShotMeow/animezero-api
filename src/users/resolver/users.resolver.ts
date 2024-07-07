import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/auth/guards/gqlAuth.guard';

import { UpdateUserInput, User } from '../users.model';
import { UsersService } from '../service/users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('id') id: number,
    @Args('user') data: UpdateUserInput,
  ) {
    return this.usersService.updateUser(id, data);
  }
}
