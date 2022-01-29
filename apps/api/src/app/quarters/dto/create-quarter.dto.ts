import { Field, Int, InputType } from '@nestjs/graphql';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { PolygonType } from '../entities/polygon.interface';

/**
 * Defines the input type for creating a new quarter object
 *
 * @export CreateQuarterDto
 * @class CreateQuarterDto
 */
@InputType()
export class CreateQuarterDto {
  @IsInt()
  @Field(() => Int, { description: 'ID of the quarter' })
  @Min(1)
  @Max(99)
  id: number;

  @IsString()
  @Field(() => String, { description: 'Name of the quarter' })
  quarter: string;

  @Field(() => [Number, Number], { description: 'Polygon of the quarter' })
  polygon: PolygonType;
}
