import { ObjectType, Field, ID } from "@nestjs/graphql";
import { IsUUID } from "class-validator";
import { Author } from "../../authors/entities/author.entity";
import { 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
} from "typeorm";



@Entity({ name: 'Posts' })
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field((type) => ID) 
    id: string;
    
    @Column()
    @Field()
    title: string;

    @Column()
    @Field() 
    content: string;

    @Column()
    @IsUUID()
    @Field((type) => ID)
    authorId: string

    @ManyToOne(() => Author, author => author.posts)
    @Field(() => Author)
    author: Author;

    @CreateDateColumn()
    @Field()
    createdDate: Date;
  
    @UpdateDateColumn()
    updatedDate: Date;
  
    @DeleteDateColumn()
    @Field()
    deletedAt: Date;
}