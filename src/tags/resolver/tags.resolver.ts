import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagsService } from '@/tags/service/tags.service';
import { CreateTagInput, Tag, UpdateTagInput } from '../tags.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/auth/guards/gqlAuth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@/utils/enums';
import { Options } from '@/utils/base.model';

@Resolver()
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => Tag)
  async getTagById(@Args('id') id: number): Promise<Tag> {
    return this.tagsService.getTagById(id);
  }

  @Query(() => [Tag])
  async getTags(
    @Args('options', { nullable: true }) options?: Options,
  ): Promise<Tag[]> {
    return this.tagsService.getTags(options);
  }

  @Mutation(() => Tag)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async createTag(@Args('tag') data: CreateTagInput): Promise<Tag> {
    return this.tagsService.createTag(data);
  }

  @Mutation(() => Tag)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async updateTag(
    @Args('id') id: number,
    @Args('tag') data: UpdateTagInput,
  ): Promise<Tag> {
    return this.tagsService.updateTag(id, data);
  }

  @Mutation(() => Tag)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.OWNER)
  async deleteTag(@Args('id') id: number): Promise<Tag> {
    return this.tagsService.deleteTag(id);
  }
}
