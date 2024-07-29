import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    // @CreateDateColumn()
    // @Field()
    // createdDate: Date;
  
    // @UpdateDateColumn()
    // updatedDate: Date;
  
    // @DeleteDateColumn()
    // @Field()
    // deletedAt: Date;
}