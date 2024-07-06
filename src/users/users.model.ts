import { Field, InputType, ObjectType } from '@nestjs/graphql';
import type { User as UserModel } from '@prisma/client';
import { BaseModel } from '@/utils/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String)
  name: UserModel['name'];

  @Field(() => String, { nullable: true })
  avatarUrl: UserModel['avatarUrl'];

  @Field(() => String, { nullable: true })
  email: UserModel['email'];

  @Field(() => String, { nullable: true })
  phone: UserModel['phone'];
}

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: UserModel['name'];

  @Field(() => String, { nullable: true })
  email?: UserModel['email'];

  @Field(() => String, { nullable: true })
  phone?: UserModel['phone'];

  @Field(() => String)
  password: UserModel['password'];
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  name?: UserModel['name'];

  @Field(() => String, { nullable: true })
  email?: UserModel['email'];

  @Field(() => String, { nullable: true })
  phone?: UserModel['phone'];

  @Field(() => String, { nullable: true })
  password?: UserModel['password'];
}
