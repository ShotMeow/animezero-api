import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User } from '@/users/users.model';
import { Response, SignInInput, SignUpInput } from '../auth.model';
import { AuthService } from '../service/auth.service';
import { AuthUser } from '../decorators/user.decorator';
import { GqlAuthGuard } from '../guards/gqlAuth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@AuthUser() user: User) {
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
