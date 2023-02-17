import { Post } from '../../entities/Post'
import { Length } from 'class-validator'
import { InputType, Field } from 'type-graphql'

@InputType()
export class PostInput implements Partial<Post> {
  @Field()
  @Length(1, 1024)
  image: string

  @Field()
  @Length(1, 255)
  title: string

  @Field()
  @Length(1, 4096)
  description: string
}
