import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateQuarterDto } from './create-quarter.dto';

/**
 * Define the input type for updating an existing Quarter
 *
 * @export
 * @class UpdateQuarterDto
 * @extends {PartialType(CreateQuarterDto)}
 */
@InputType()
export class UpdateQuarterDto extends PartialType(CreateQuarterDto) {
  @IsInt()
  @Field(() => Int)
  id: number;
}
