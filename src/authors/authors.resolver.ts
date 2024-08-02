import { Resolver, Query, Mutation, Args, Int, Parent } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Post } from 'src/posts/entities/post.entity';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService
  ) {}

  @Mutation(() => Author)
  createAuthor(@Args('createAuthorInput') createAuthorInput: CreateAuthorInput) {
    return this.authorsService.create(createAuthorInput);
  }

  @Query(() => Author)
  authorByName(@Args('name', { type: () => String }) name: string): Promise<Author> {
    return this.authorsService.findOneAuthor(name);
  }

  @Query(() => Author)
  authorById(@Args('id', { type: () => String }) id: string): Promise<Author> {
    return this.authorsService.findOneId(id);
  }

  @Query(() => [Author], { name: 'authors' })
  findAll(): Promise<Author[]> {
     return this.authorsService.findAll();
  }

  // @Mutation(() => Author)
  // updateAuthor(@Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput) {
  //   return this.authorsService.update(updateAuthorInput.id, updateAuthorInput);
  // }

  // @Mutation(() => Author)
  // removeAuthor(@Args('id', { type: () => Int }) id: number) {
  //   return this.authorsService.remove(id);
  // }
}
