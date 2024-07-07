import { Field, InputType, ObjectType } from '@nestjs/graphql';
import type { Tag as TagModel } from '@prisma/client';

import { BaseModel } from '@/utils/base.model';

@ObjectType()
export class Tag extends BaseModel {
  @Field(() => String)
  name: TagModel['name'];
}

@InputType()
export class CreateTagInput {
  @Field(() => String)
  name: TagModel['name'];
}

@InputType()
export class UpdateTagInput {
  @Field(() => String, { nullable: true })
  name?: TagModel['name'];
}
