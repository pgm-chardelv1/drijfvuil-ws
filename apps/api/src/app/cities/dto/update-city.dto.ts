import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateCityDto } from './create-city.dto';

/**
 * Define the input type for updating an existing city object
 *
 * @export UpdateCityDto
 * @class UpdateCityDto
 * @extends {PartialType(CreateCityDto)}
 */
@InputType()
export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsInt()
  @Field(() => Int, { description: 'Postal code' })
  id: number;
}
