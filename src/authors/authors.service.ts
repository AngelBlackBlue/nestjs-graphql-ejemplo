import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) 
    private readonly authorRepository: Repository<Author>,
  ){}

  async create(author: CreateAuthorInput): Promise<Author> {
    const autorName = await this.findOneAuthor(author.name);
    if(autorName){
      throw new GraphQLError('Title already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: author.name
          }
    })}
    const newAuthor = await this.authorRepository.create(author);
    return this.authorRepository.save(newAuthor);
  }

  async findOneAuthor(name: string): Promise<Author> {
    return await this.authorRepository.findOneBy({name}); 
  }

  async findOneId(id: string): Promise<Author> {
    return await this.authorRepository.findOneBy({id}); 
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
