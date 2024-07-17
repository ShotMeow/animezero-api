import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import type { Episode as EpisodeModel } from '@prisma/client';

import { BaseModel } from '@/utils/base.model';

@ObjectType()
export class Episode extends BaseModel {
  @Field(() => String)
  name: EpisodeModel['name'];

  @Field(() => String)
  description: EpisodeModel['description'];

  @Field(() => String)
  videoUrl: EpisodeModel['videoUrl'];

  @Field(() => String)
  voiceover: EpisodeModel['voiceover'];

  @Field(() => Int, { nullable: true })
  episode?: EpisodeModel['episode'];

  @Field(() => Int, { nullable: true })
  season?: EpisodeModel['season'];

  @Field(() => String)
  openingStart: EpisodeModel['openingStart'];

  @Field(() => String)
  openingEnd: EpisodeModel['openingEnd'];

  @Field(() => String)
  endingStart: EpisodeModel['endingStart'];

  @Field(() => String, { nullable: true })
  endingEnd?: EpisodeModel['endingEnd'];
}

@InputType()
export class CreateEpisodeInput {
  @Field(() => String)
  name: EpisodeModel['name'];

  @Field(() => String)
  description: EpisodeModel['description'];

  @Field(() => String)
  videoUrl: EpisodeModel['videoUrl'];

  @Field(() => String)
  voiceover: EpisodeModel['voiceover'];

  @Field(() => Int, { nullable: true })
  episode?: EpisodeModel['episode'];

  @Field(() => Int, { nullable: true })
  season?: EpisodeModel['season'];

  @Field(() => String)
  openingStart: EpisodeModel['openingStart'];

  @Field(() => String)
  openingEnd: EpisodeModel['openingEnd'];

  @Field(() => String)
  endingStart: EpisodeModel['endingStart'];

  @Field(() => String, { nullable: true })
  endingEnd?: EpisodeModel['endingEnd'];
}

@InputType()
export class UpdateEpisodeInput {
  @Field(() => String, { nullable: true })
  name?: EpisodeModel['name'];

  @Field(() => String, { nullable: true })
  description?: EpisodeModel['description'];

  @Field(() => String, { nullable: true })
  videoUrl?: EpisodeModel['videoUrl'];

  @Field(() => String, { nullable: true })
  voiceover?: EpisodeModel['voiceover'];

  @Field(() => Int, { nullable: true })
  episode?: EpisodeModel['episode'];

  @Field(() => Int, { nullable: true })
  season?: EpisodeModel['season'];

  @Field(() => String, { nullable: true })
  openingStart?: EpisodeModel['openingStart'];

  @Field(() => String, { nullable: true })
  openingEnd?: EpisodeModel['openingEnd'];

  @Field(() => String, { nullable: true })
  endingStart?: EpisodeModel['endingStart'];

  @Field(() => String, { nullable: true })
  endingEnd?: EpisodeModel['endingEnd'];
}
