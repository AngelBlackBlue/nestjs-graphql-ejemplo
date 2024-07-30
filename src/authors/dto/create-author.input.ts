import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @Transform(({ value }) => value.trim())
  @MinLength(5, { message: 'Content must be at least 5 characters' }) 
  @MaxLength(50, { message: 'Title must be between 5 and 50 characters' })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  @Field()
  name: string;
}
