import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostInput  } from './dto/create-post.input';
import { Author } from '../authors/entities/author.entity';
import { AuthorsService } from '../authors/authors.service';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) 
        private readonly postsRepository: Repository<Post>,
        private readonly authorsRepository: AuthorsService,
    ){}

    async findAll(): Promise<Post[]> {
        return await this.postsRepository.find();
    }

    async findAllPostByAuthor(authorId: string): Promise<Post[]> {
        return await this.postsRepository.find({ where: { authorId }, relations: ['author'] })
        
    }

    async findOneByTitle(title: string): Promise<Post> {
        return await this.postsRepository.findOneBy({ title })
    }

    async findOneById(id: string): Promise<Post> {
        return await this.postsRepository.findOneBy({ id })
    }

    async createPost(post: CreatePostInput ): Promise<Post> {
        const newPost = await this.postsRepository.create(post);
        return await this.postsRepository.save(newPost);
    }

    async getAuthor(authorId: string): Promise<Author> {
        return await this.authorsRepository.findOneId(authorId);
    }

    async update(id: string, updatePostInput: UpdatePostInput) {
        await this.postsRepository.update(id, {...updatePostInput});
        return await this.findOneById(id);
    }

    async remove (id: string){
        const deleteId = await this.findOneById(id);
         await this.postsRepository.softDelete({ id }); 
         return deleteId
    }


}
