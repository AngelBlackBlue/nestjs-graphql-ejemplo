import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) 
        private readonly postsRepository: Repository<Post>
    ){}

    async findAll(): Promise<Post[]> {
        return await this.postsRepository.find();
    }
}
