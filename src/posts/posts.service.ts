import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput  } from './dto/create-post.Input ';
import { GraphQLError } from 'graphql';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) 
        private readonly postsRepository: Repository<Post>
    ){}

    async findAll(): Promise<Post[]> {
        return await this.postsRepository.find();
    }

    async findOneByTitle(title: string): Promise<Post> {
        return await this.postsRepository.findOneBy({ title })
    }

    async findOneById(id: string): Promise<Post> {
        return await this.postsRepository.findOneBy({ id })
    }

    async createPost(post: CreatePostInput ): Promise<Post> {
        const postTitle = await this.findOneByTitle(post.title);
        if(postTitle){
            throw new GraphQLError('Title already exists', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: post.title
                }
        })}
        const newPost = await this.postsRepository.create(post);
        return this.postsRepository.save(newPost);
    }
}
