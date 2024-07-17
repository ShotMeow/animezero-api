import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import type { Movie as MovieModel } from '@prisma/client';

import { BaseModel } from '@/utils/base.model';

@ObjectType()
export class Movie extends BaseModel {
  @Field(() => String)
  title: MovieModel['title'];

  @Field(() => String)
  description: MovieModel['description'];

  @Field(() => String)
  pictureUrl: MovieModel['pictureUrl'];

  @Field(() => String)
  wallpaperUrl: MovieModel['wallpaperUrl'];

  @Field(() => String, { nullable: true })
  ageRating?: MovieModel['ageRating'];

  @Field(() => Float, { nullable: true })
  rating?: MovieModel['rating'];

  @Field(() => String, { nullable: true })
  status?: MovieModel['status'];

  @Field(() => Int)
  countryId: MovieModel['countryId'];

  @Field(() => Int, { nullable: true })
  year?: MovieModel['year'];

  @Field(() => String)
  type: MovieModel['type'];
}

@InputType()
export class CreateMovieInput {
  @Field(() => String)
  title: MovieModel['title'];

  @Field(() => String)
  description: MovieModel['description'];

  @Field(() => String)
  wallpaperUrl: MovieModel['wallpaperUrl'];

  @Field(() => String)
  pictureUrl: MovieModel['pictureUrl'];

  @Field(() => String, { nullable: true })
  ageRating?: MovieModel['ageRating'];

  @Field(() => Float, { nullable: true })
  rating?: MovieModel['rating'];

  @Field(() => String, { nullable: true })
  status?: MovieModel['status'];

  @Field(() => Int)
  countryId: MovieModel['countryId'];

  @Field(() => Int, { nullable: true })
  year?: MovieModel['year'];

  @Field(() => String)
  type: MovieModel['type'];
}

@InputType()
export class UpdateMovieInput {
  @Field(() => String, { nullable: true })
  title?: MovieModel['title'];

  @Field(() => String, { nullable: true })
  description?: MovieModel['description'];

  @Field(() => String, { nullable: true })
  wallpaperUrl?: MovieModel['wallpaperUrl'];

  @Field(() => String, { nullable: true })
  pictureUrl?: MovieModel['pictureUrl'];

  @Field(() => String, { nullable: true })
  ageRating?: MovieModel['ageRating'];

  @Field(() => Float, { nullable: true })
  rating?: MovieModel['rating'];

  @Field(() => String, { nullable: true })
  status?: MovieModel['status'];

  @Field(() => Int, { nullable: true })
  countryId?: MovieModel['countryId'];

  @Field(() => Int, { nullable: true })
  year?: MovieModel['year'];

  @Field(() => String, { nullable: true })
  type?: MovieModel['type'];
}
