// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Post } from '@nestjs/common';
// import { AuthorsModule } from '../authors/authors.module';
// import { getRepositoryToken } from '@nestjs/typeorm';



// describe('PostsResolver', () => {
//   let resolver: PostsResolver;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         TypeOrmModule.forFeature([Post]), 
//         AuthorsModule,

//       ],
//       providers: [
//         PostsResolver,
//         PostsService, 

//       ],
//     }).compile();

//     resolver = module.get<PostsResolver>(PostsResolver);
//   });

//   it('should be defined', () => {
//     expect(resolver).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { Author } from '../authors/entities/author.entity';
import { CreatePostInput } from './dto/create-post.input ';
import { UpdatePostInput } from './dto/update-post.input';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from '../authors/authors.module';

describe('PostsResolver', () => {
 
  let service: PostsService;

  const mockPostsService = {
    // findAll: jest.fn(() => Promise.resolve([{ id: '1', title: 'Test Post', authorId: 'author1' }] as Post[])),
    // findOneByTitle: jest.fn((title: string) => Promise.resolve({ id: '1', title, authorId: 'author1' } as Post)),
    // findOneById: jest.fn((id: string) => Promise.resolve({ id, title: 'Test Post', authorId: 'author1' } as Post)),
    // findAllPostByAuthor: jest.fn((authorId: string) => Promise.resolve([{ id: '1', title: 'Test Post', authorId } as Post])),
    // createPost: jest.fn((postInput: CreatePostInput) => Promise.resolve({ id: '1', ...postInput } as Post)),
    // getAuthor: jest.fn((authorId: string) => Promise.resolve({ id: authorId } as Author)),
    // update: jest.fn((id: string, updatePostInput: UpdatePostInput) => Promise.resolve({ id, ...updatePostInput } as Post)),
    // remove: jest.fn((id: string) => Promise.resolve({ id, title: 'Test Post', authorId: 'author1' } as Post)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Post]), AuthorsModule],
      providers: [
        PostsResolver,
        PostsService, 
      ],
    }).compile();

    
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // describe('posts', () => {
  //   it('should return an array of posts', async () => {
  //     expect(await resolver.posts()).toEqual([{ id: '1', title: 'Test Post', authorId: 'author1' } as Post]);
  //   });
  // });

  // describe('postByTitle', () => {
  //   it('should return a post by title', async () => {
  //     expect(await resolver.postByTitle('Test Post')).toEqual({ id: '1', title: 'Test Post', authorId: 'author1' });
  //   });
  // });

  // describe('postById', () => {
  //   it('should return a post by id', async () => {
  //     expect(await resolver.postById('1')).toEqual({ id: '1', title: 'Test Post', authorId: 'author1' });
  //   });
  // });

  // describe('postsAuthor', () => {
  //   it('should return posts by authorId', async () => {
  //     expect(await resolver.postsAuthor('author1')).toEqual([{ id: '1', title: 'Test Post', authorId: 'author1' }]);
  //   });
  // });

  // describe('createPost', () => {
  //   it('should create a new post', async () => {
  //     const postInput: CreatePostInput = { title: 'New Post', authorId: 'author1' };
  //     expect(await resolver.createPost(postInput)).toEqual({ id: '1', ...postInput });
  //   });
  // });

  // describe('updatePost', () => {
  //   it('should update a post', async () => {
  //     const updatePostInput: UpdatePostInput = { id: '1', title: 'Updated Post' };
  //     expect(await resolver.updatePost(updatePostInput)).toEqual({ id: '1', ...updatePostInput });
  //   });
  // });

  // describe('removePost', () => {
  //   it('should remove a post', async () => {
  //     expect(await resolver.removePost('1')).toEqual({ id: '1', title: 'Test Post', authorId: 'author1' });
  //   });
  // });
});

