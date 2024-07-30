import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class AuthorsService {
  
  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
  ){}


  async create(author: CreateAuthorInput): Promise<Post> {
    const autorName = await this.authorRepository.findOneBy({name: author.name});
    return 
  }

  findAll() {
    return `This action returns all authors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
