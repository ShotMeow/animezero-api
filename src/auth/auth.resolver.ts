import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Response, SignInInput, SignUpInput } from './auth.model';
import { AuthService } from './auth.service';
import { User } from '@/users/users.model';
import { AuthUser } from '@/auth/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/auth/guards/gqlAuth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@AuthUser() user: User) {
    console.log(user);
    return this.authService.getAuthUser(user.id);
  }

  @Mutation(() => Response)
  async signIn(@Args('user') data: SignInInput) {
    return this.authService.signIn(data);
  }

  @Mutation(() => Response)
  async signUp(@Args('user') data: SignUpInput) {
    return this.authService.signUp(data);
  }
}
