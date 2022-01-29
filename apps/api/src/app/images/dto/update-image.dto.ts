import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateImageDto } from './create-image.dto';

/**
 * Define the input type for updating an existing image
 *
 * @export
 * @class UpdateImageDto
 * @extends {PartialType(CreateImageDto)}
 */
@InputType()
export class UpdateImageDto extends PartialType(CreateImageDto) {
  @IsUUID()
  @Field(() => String, { description: 'ID for the image' })
  id: string;
}
