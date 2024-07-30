import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post';

@Resolver()
export class PostsResolver {
    constructor(  
        private readonly postsService: PostsService) {}
    
    @Query((returns) => [Post])    
    posts() { 
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

    @Mutation((returns)=>Post)
    createPost(@Args('postInput') postInput: CreatePostDto) {
        return this.postsService.createPost(postInput);
     }
}
