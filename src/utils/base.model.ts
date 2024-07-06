import { Field, GraphQLISODateTime, Int } from '@nestjs/graphql';

export abstract class BaseModel {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  updatedAt: string;

  @Field(() => GraphQLISODateTime)
  createdAt: string;
}
