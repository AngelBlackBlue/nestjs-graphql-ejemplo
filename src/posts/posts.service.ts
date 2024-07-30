import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post';
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

    async findOne(title: string): Promise<Post> {
        return await this.postsRepository.findOneBy({ title })
    }

    async createPost(post: CreatePostDto): Promise<Post> {
        const postTitle = await this.postsRepository.findOneBy({ title: post.title });
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
