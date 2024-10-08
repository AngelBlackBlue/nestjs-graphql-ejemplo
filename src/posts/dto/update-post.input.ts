import { IsString, IsUUID } from 'class-validator';

import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.input';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @IsUUID()
  @IsString()
  @Field()
  id: string;
}
