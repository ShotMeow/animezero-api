import { Field, InputType, ObjectType } from '@nestjs/graphql';
import type { Country as CountryModel } from '@prisma/client';

import { BaseModel } from '@/utils/base.model';

@ObjectType()
export class Country extends BaseModel {
  @Field(() => String)
  name: CountryModel['name'];
}

@InputType()
export class CreateCountryInput {
  @Field(() => String)
  name: CountryModel['name'];
}

@InputType()
export class UpdateCountryInput {
  @Field(() => String, { nullable: true })
  name?: CountryModel['name'];
}
