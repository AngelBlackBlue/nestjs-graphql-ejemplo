import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Post } from "src/posts/entities/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'authors' })
@ObjectType()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    @Field((type) => ID) 
    id: string;
    
    @Column()
    @Field()
    name: string;

    @OneToMany(() => Post, (post) => post.author)
    @Field(()=> [Post], {nullable: true}) 
    posts: Post[];


    // @CreateDateColumn()
    // @Field()
    // createdDate: Date;
  
    // @UpdateDateColumn()
    // updatedDate: Date;
  
    // @DeleteDateColumn()
    // @Field()
    // deletedAt: Date;
}