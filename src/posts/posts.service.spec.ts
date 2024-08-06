// import { Test, TestingModule } from '@nestjs/testing';
// import { PostsService } from './posts.service';

// describe('PostsService', () => {
//   let service: PostsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [PostsService],
//     }).compile();

//     service = module.get<PostsService>(PostsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../authors/entities/author.entity';
import { AuthorsService } from '../authors/authors.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

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
    id: 'author1',
    name: 'Author Name',
    posts: [], 
    createdDate: new Date(),
    updatedDate: new Date(),
    deletedAt: new Date(),
  };
  
  const result: Post[] = [{
    id: '1',
    title: 'Test Post',
    content: 'Content',
    authorId: 'author1',
    author: mockAuthor, 
    createdDate: new Date(),
    updatedDate: new Date(),
    deletedAt: new Date(),
  }];

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


  describe('findAll', () => {
    it('should return an array of posts', async () => {
       mockPostRepository.find.mockResolvedValue(result);
       expect(await service.findAll()).toEqual(result);
    });
  });

  // describe('findOneByTitle', () => {
  //   it('should return a post by title', async () => {
  //     const result: Post = { id: '1', title: 'Test Post', content: 'Content', authorId: 'author1' };
  //     mockPostRepository.findOneBy.mockResolvedValue(result);

  //     expect(await service.findOneByTitle('Test Post')).toEqual(result);
  //   });
  // });

  // describe('findOneById', () => {
  //   it('should return a post by id', async () => {
  //     const result: Post = { id: '1', title: 'Test Post', content: 'Content', authorId: 'author1' };
  //     mockPostRepository.findOneBy.mockResolvedValue(result);

  //     expect(await service.findOneById('1')).toEqual(result);
  //   });
  // });

  // describe('findAllPostByAuthor', () => {
  //   it('should return posts by authorId', async () => {
  //     const result: Post[] = [{ id: '1', title: 'Test Post', content: 'Content', authorId: 'author1' }];
  //     mockPostRepository.find.mockResolvedValue(result);

  //     expect(await service.findAllPostByAuthor('author1')).toEqual(result);
  //   });
  // });

  // describe('createPost', () => {
  //   it('should create and return a new post', async () => {
  //     const postInput: CreatePostInput = { title: 'New Post', content: 'New Content', authorId: 'author1' };
  //     const result: Post = { id: '1', ...postInput };

  //     mockPostRepository.create.mockReturnValue(result);
  //     mockPostRepository.save.mockResolvedValue(result);

  //     expect(await service.createPost(postInput)).toEqual(result);
  //   });
  // });

  // describe('getAuthor', () => {
  //   it('should return the author of a post', async () => {
  //     const result: Author = { id: 'author1', name: 'Author Name', posts: [] };
  //     mockAuthorsService.findOneId.mockResolvedValue(result);

  //     expect(await service.getAuthor('author1')).toEqual(result);
  //   });
  // });

  // describe('update', () => {
  //   it('should update and return the updated post', async () => {
  //     const updatePostInput: UpdatePostInput = { id: '1', title: 'Updated Post', content: 'Updated Content', authorId: 'author1' };
  //     const result: Post = { id: '1', title: 'Updated Post', content: 'Updated Content', authorId: 'author1' };

  //     mockPostRepository.update.mockResolvedValue(result);
  //     mockPostRepository.findOneBy.mockResolvedValue(result);

  //     expect(await service.update('1', updatePostInput)).toEqual(result);
  //   });
  // });

  // describe('remove', () => {
  //   it('should soft delete a post and return the deleted post', async () => {
  //     const result: Post = { id: '1', title: 'Test Post', content: 'Content', authorId: 'author1' };
  //     mockPostRepository.findOneBy.mockResolvedValue(result);
  //     mockPostRepository.softDelete.mockResolvedValue(result);

  //     expect(await service.remove('1')).toEqual(result);
  //   });
  // });
});
