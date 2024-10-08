import { IsString, IsUUID } from 'class-validator';
import { CreateAuthorInput } from './create-author.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @IsUUID()
  @IsString()
  @Field()
  id: string;
}
