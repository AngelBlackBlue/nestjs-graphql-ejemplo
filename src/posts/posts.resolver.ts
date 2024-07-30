import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input ';

@Resolver()
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

    @Mutation(()=>Post)
    createPost(@Args('postInput') postInput: CreatePostInput) {
        return this.postsService.createPost(postInput);
     }
}
