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
  ){}

  async create(author: CreateAuthorInput): Promise<Author> {
    const authorName = await this.findOneAuthor(author.name);
    if(authorName){
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
    const autorName = await this.authorRepository.findOne({
      where: { name },
      relations: ['posts']
    }); 
    if(autorName === null){
      throw new GraphQLError('author does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: name
          }
    })}
    return autorName;
  }

  async findOneId(id: string): Promise<Author> {
    const authorId = await this.authorRepository.findOne({
      where: { id },
      relations: ['posts']
    });

    if(authorId === null){
      throw new GraphQLError('author does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: id
          }
    })}
    return authorId;

  }
  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find({relations: ['posts']});
  }

  async update(id: string, updateAuthorInput: UpdateAuthorInput) {

    await this.findOneId(id);

    const autorName = await this.authorRepository.findOne({
      where: { name: updateAuthorInput.name },
      relations: ['posts']
    }); 
    
    if(autorName && autorName.id !== id){
      throw new GraphQLError('Author already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: updateAuthorInput.name
          }
    })}
  
    const aux = await this.authorRepository.update(id, {...updateAuthorInput});
    return await this.findOneId(id);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} author`;
  // }
}
