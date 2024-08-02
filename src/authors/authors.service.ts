import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { GraphQLError } from 'graphql';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) 
    private readonly authorRepository: Repository<Author>, 
    // private readonly postRepository: PostsService,
  ){}

  async create(author: CreateAuthorInput): Promise<Author> {
    const autorName = await this.findOneAuthor(author.name);
    if(autorName){
      throw new GraphQLError('Author already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: author.name
          }
    })}
    const newAuthor = await this.authorRepository.create(author);
    return this.authorRepository.save(newAuthor);
  }

  async findOneAuthor(name: string): Promise<Author> {
    return await this.authorRepository.findOne({
      where: { name },
      relations: ['posts']
    }); 
  }

  async findOneId(id: string): Promise<Author> {
    return await this.authorRepository.findOne({
      where: { id },
      relations: ['posts']
    });
  }
  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find({relations: ['posts']});
  }

  // update(id: number, updateAuthorInput: UpdateAuthorInput) {
  //   return `This action updates a #${id} author`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} author`;
  // }
}
