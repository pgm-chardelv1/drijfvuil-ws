import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

/**
 * Input type for creating a new Cleanup object
 *
 * @export CreateCleanupDto
 * @class CreateCleanupDto
 */
@InputType()
export class CreateCleanupDto {
  /**
   * Report ID that was cleaned up
   *
   * @type {number}
   * @memberof CreateCleanupDto
   */
  @IsInt()
  @Field(() => Int, {
    description: 'Cleanup for report with ID',
  })
  reportId: number;

  /**
   * Was this a full or partial cleanup?
   *
   * @type {string}
   * @memberof CreateCleanupDto
   */
  @Field(() => String, { description: 'Cleanup type? "partial" or "full"' })
  type: string;

  /**
   * Location of the cleanup as a [Latitude, Longitude]
   *
   * @type {[number, number]}
   * @memberof CreateCleanupDto
   */
  @Field(() => [Number, Number], {
    description: 'Latitude and longitude of the cleanup.',
  })
  location: [number, number];

  /**
   * Postal code of the city where this cleanup happened
   *
   * @type {number}
   * @memberof CreateCleanupDto
   */
  @Field(() => Int, { description: 'City ID where cleanup took place' })
  cityId: number;

  /**
   * Quarter code where this cleanup happened
   *
   * @type {number}
   * @memberof CreateCleanupDto
   */
  @Field(() => Int, {
    description: 'Cleanup in this quarter',
    nullable: true,
  })
  quarterId?: number;
}
