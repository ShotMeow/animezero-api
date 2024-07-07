import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagsService } from '@/tags/service/tags.service';
import { CreateTagInput, Tag, UpdateTagInput } from '../tags.model';

@Resolver()
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => Tag)
  async getTagById(@Args('id') id: number): Promise<Tag> {
    return this.tagsService.getTagById(id);
  }

  @Query(() => [Tag])
  async getTags(): Promise<Tag[]> {
    return this.tagsService.getTags();
  }

  @Mutation(() => Tag)
  async createTag(@Args('tag') data: CreateTagInput): Promise<Tag> {
    return this.tagsService.createTag(data);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Args('id') id: number,
    @Args('tag') data: UpdateTagInput,
  ): Promise<Tag> {
    return this.tagsService.updateTag(id, data);
  }

  @Mutation(() => Tag)
  async deleteTag(@Args('id') id: number): Promise<Tag> {
    return this.tagsService.deleteTag(id);
  }
}
