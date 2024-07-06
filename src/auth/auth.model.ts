import { Field, InputType, ObjectType } from '@nestjs/graphql';
import type { User as UserModel } from '.prisma/client';
import { CreateUserInput } from '@/users/users.model';

@InputType()
export class SignInInput {
  @Field(() => String)
  name: UserModel['name'];

  @Field(() => String)
  password: UserModel['password'];
}

@InputType()
export class SignUpInput extends CreateUserInput {}

@ObjectType()
export class Response {
  @Field(() => String, { nullable: true })
  token?: string;
}
