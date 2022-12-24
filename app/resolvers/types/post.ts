import { Length } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { Post } from '~/entities/Post'

@InputType()
export class PostInput implements Partial<Post> {
  @Field()
  @Length(1, 1024)
  image: String

  @Field()
  @Length(1, 255)
  title: String

  @Field()
  @Length(1, 4096)
  description: String
}
