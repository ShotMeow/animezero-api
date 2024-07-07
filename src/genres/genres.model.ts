import { Field, InputType, ObjectType } from '@nestjs/graphql';
import type { Genre as GenreModel } from '@prisma/client';

import { BaseModel } from '@/utils/base.model';

@ObjectType()
export class Genre extends BaseModel {
  @Field(() => String)
  name: GenreModel['name'];
}

@InputType()
export class CreateGenreInput {
  @Field(() => String)
  name: GenreModel['name'];
}

@InputType()
export class UpdateGenreInput {
  @Field(() => String, { nullable: true })
  name?: GenreModel['name'];
}
