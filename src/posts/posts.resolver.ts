import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input ';
import { Author } from 'src/authors/entities/author.entity';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(()=>Post)
export class PostsResolver {
    constructor(  
        private readonly postsService: PostsService) {}
    
    @Query(() => [Post])    
    posts(): Promise<Post[]> { 
        return this.postsService.findAll(); 
    }

    @Query(() => Post)
    postByTitle(@Args('title', { type: () => String }) title: string): Promise<Post> {
        return this.postsService.findOneByTitle(title);
    }

    @Query(() => Post)
    postById(@Args('id', { type: () => String }) id: string): Promise<Post> {
        return this.postsService.findOneById(id);        
    }

    @Query(() => [Post])
    postsAuthor(@Args('authorId', { type: () => String }) authorId: string): Promise<Post[]> {
        return this.postsService.findAllPostByAuthor(authorId);
    }    
    
    @Mutation(()=>Post)
    createPost(@Args('postInput') postInput: CreatePostInput) {
        return this.postsService.createPost(postInput);
    }

    @ResolveField(()=> Author)
    author(@Parent() post: Post): Promise<Author> {
        return this.postsService.getAuthor(post.authorId);
    }

    @Mutation(() => Post)
    updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
      return this.postsService.update(updatePostInput.id, updatePostInput);
    }
  
    @Mutation(() => Post)
    removePost(@Args('id', { type: () => String }) id: string) {
      return this.postsService.remove(id);
    }
}
