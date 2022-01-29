import { Field, InputType } from '@nestjs/graphql';

/**
 * Define the input type for creating a new Image
 *
 * @export CreateImageDto
 * @class CreateImageDto
 */
@InputType()
export class CreateImageDto {
  @Field(() => String, {
    description: 'URL where the image is located',
    nullable: true,
  })
  url?: string;

  @Field(() => String, { description: 'File name of the image' })
  key: string;
}
