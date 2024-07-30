import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength, IsUUID } from "class-validator";


@InputType()
export class CreatePostInput {

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(5, { message: 'Content must be at least 5 characters' }) 
    @MaxLength(50, { message: 'Title must be between 5 and 50 characters' })
    @IsNotEmpty({ message: 'Title is required' })
    @Field()
    title: string;
    
    @Transform(({ value }) => value.trim())
    @IsString({ message: 'Content must be a string' })
    @MaxLength(400, { message: 'Content must be 400 characters or less.' })
    @Field({nullable: true})
    content?: string;

    @IsUUID()
    @Field()
    authorId: string
}