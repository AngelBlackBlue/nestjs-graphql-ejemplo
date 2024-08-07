import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../authors/entities/author.entity';
import { AuthorsService } from '../authors/authors.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { spec } from 'node:test/reporters';

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: Repository<Post>;
  let authorsService: AuthorsService;

  const mockPostRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockAuthorsService = {
    findOneId: jest.fn(),
  };

  const mockAuthor: Author = {
    id: '825d324d-275d-49c0-9619-5a452a3f6d23',
    name: 'Author Name',
    posts: [], 
    createdDate: new Date(),
    updatedDate: new Date(),
    deletedAt: new Date(),
  };
  
  const post: Post = {
    id: '5370ddcf-bdf5-4ab9-a4eb-eb84125c0506',
    title: 'Test Post',
    content: 'Content',
    authorId: '825d324d-275d-49c0-9619-5a452a3f6d23',
    author: mockAuthor, 
    createdDate: new Date(),
    updatedDate: new Date(),
    deletedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getRepositoryToken(Post), useValue: mockPostRepository },
        { provide: AuthorsService, useValue: mockAuthorsService },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    authorsService = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  // describe('findAll', () => {
  //   it('should return an array of posts', async () => {
  //      mockPostRepository.find.mockResolvedValue(result);
  //      expect(await service.findAll()).toEqual(result);
  //   });
  // });

  // describe('findOneByTitle', () => {
  //   it('should return a post by title', async () => {
  //     mockPostRepository.findOneBy.mockResolvedValue('Test Post');


  //     expect(await service.findOneByTitle(result[])).toEqual() ;
  //   });
  // });

  describe('findOneById', () => {
    it('should return a post by id', async () => {
      jest.spyOn(postRepository, 'findOneBy').mockResolvedValue(post);
      
      const result = await service.findOneById(post.id)

      expect(postRepository.findOneBy).toHaveBeenCalledWith({ id: post.id });
      expect(result).toEqual(post); 
    });
  })


});
