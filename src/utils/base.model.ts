import {
  Field,
  GraphQLISODateTime,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { OrderBy } from '@/utils/enums';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}

registerEnumType(OrderBy, { name: 'OrderByType' });

@InputType()
export class Options {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => OrderBy, { nullable: true })
  orderBy?: OrderBy;
}
