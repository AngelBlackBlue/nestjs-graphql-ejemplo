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

  const mockAuthor: Author[] =   [
    {
      id: '825d324d-275d-49c0-9619-5a452a3f6d23',
      name: 'Author 01',
      posts: [], 
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedAt: new Date(),
    },
    {
      id: '825d324d-275d-49c0-9619-5a452a3f6d24',
      name: 'Author 02',
      posts: [], 
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedAt: new Date(),
    }
  ];
  
  const post: Post[] = [
    {
      id: '5370ddcf-bdf5-4ab9-a4eb-eb84125c0506',
      title: 'Test Post01',
      content: 'Content',
      authorId: '825d324d-275d-49c0-9619-5a452a3f6d23',
      author: mockAuthor[0], 
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedAt: new Date(),
    },
    {
      id: '5370ddcf-bdf5-4ab9-a4eb-eb84125c0507',
      title: 'Test Post02',
      content: 'Content 02',
      authorId: '825d324d-275d-49c0-9619-5a452a3f6d24',
      author: mockAuthor[1], 
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedAt: new Date(),
    }
  ];

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
      jest.spyOn(postRepository, 'find').mockResolvedValue(post)

      const result = await service.findAll()
      expect(postRepository.find).toHaveBeenCalled()
      expect(result).toEqual(post)
    })  
  })

  describe('findAllPostByAuthor', () => {
    it('should return an array of posts by author', async () => {
      jest.spyOn(postRepository, 'find').mockResolvedValue([post[0]]);

      const result = await service.findAllPostByAuthor(post[0].authorId);
      expect(postRepository.find).toHaveBeenCalledWith({ where: { authorId: post[0].authorId }, relations: ['author'] });
      expect(result).toEqual([post[0]]);
    });
  })

  describe('findOneByTitle', () => {
    it('should return a post by title', async () => {
      jest.spyOn(postRepository, 'findOneBy').mockResolvedValue(post[1]);
      
      const result = await service.findOneByTitle(post[1].title);
      expect(postRepository.findOneBy).toHaveBeenCalledWith({ title: post[1].title });
      expect(result).toEqual(post[1]);
    })    
  })

  describe('findOneById', () => {
    it('should return a post by id', async () => {
      jest.spyOn(postRepository, 'findOneBy').mockResolvedValue(post[0]);
      
      const result = await service.findOneById(post[0].id)

      expect(postRepository.findOneBy).toHaveBeenCalledWith({ id: post[0].id });
      expect(result).toEqual(post[0]); 
    });
  })

     



});
