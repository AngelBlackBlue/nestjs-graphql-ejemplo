import { ObjectType, Field } from "@nestjs/graphql";
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
class Post {
    @Field() 
    id: string = uuidv4();
    
    @Field()
    title: string;

    @Field() 
    content: string;
}