import { Field, Int, InputType } from '@nestjs/graphql';
import { IsInt, IsString, Max, Min } from 'class-validator';

/**
 * Define the input type for creating a new City
 *
 * @export CreateCityDto
 * @class CreateCityDto
 */
@InputType()
export class CreateCityDto {
  @IsInt()
  @Field(() => Int, { description: 'Postal code' })
  @Min(1000)
  @Max(9992)
  id: number;

  @IsString()
  @Field(() => String, { description: 'City name' })
  name: string;

  @Field(() => String, { description: 'City limits as polygon json string' })
  polygon: string;
}
