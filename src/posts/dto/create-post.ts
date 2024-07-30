import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";


@InputType()
export class CreatePostDto {

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(5)
    @Field()
    title: string;
    
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(5)
    @Field()
    content: string;
}