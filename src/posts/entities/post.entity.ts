import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Author } from "src/authors/entities/author.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Posts' })
@ObjectType()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    @Field((type) => ID) 
    id: string;
    
    @Column()
    @Field()
    title: string;

    @Column({nullable: true})
    @Field({nullable: true}) 
    content?: string;

    @ManyToOne(() => Author, author => author.posts)
    @Field(() => Author)
    author: Author;

    // @CreateDateColumn()
    // @Field()
    // createdDate: Date;
  
    // @UpdateDateColumn()
    // updatedDate: Date;
  
    // @DeleteDateColumn()
    // @Field()
    // deletedAt: Date;

}