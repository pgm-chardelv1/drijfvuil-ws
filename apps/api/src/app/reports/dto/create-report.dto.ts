import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, IsUUID } from 'class-validator';
/**
 * Defines the input type for creating a new report
 *
 * @export CreateReportDto
 * @class CreateReportDto
 */
@InputType()
export class CreateReportDto {
  /**
   * Latitude and longitude location for the report
   * REQUIRED {[number, number]}
   *
   * @type {[number, number]}
   * @memberof CreateReportDto
   */
  @Field(() => [Number, Number], {
    description: 'Latitude and longitude of the report. Example: [51.156416,16.615456]',
  })
  latLngTuple: [number, number];

  /**
   * City postal code for the report
   * REQUIRED - default value should be 9000 {number}
   *
   * @type {number}
   * @memberof CreateReportDto
   */
  @IsInt()
  @Field(() => Int, {
    description: 'The postal code for the city the report is made in',
  })
  cityId: number;

  /**
   * Quarter ID for the report
   * OPTIONAL {number}
   *
   * @type {number}
   * @memberof CreateReportDto
   */
  @IsInt()
  @Field(() => Int, {
    description: 'The ID for the quarter the report is made in',
  })
  quarterId?: number;

  /**
   * Image ID for the image linked to the report
   * OPTIONAL, but recommended {uuid}
   *
   * @type {string}
   * @memberof CreateReportDto
   */
  @IsUUID()
  @Field(() => String, {
    description: 'Images for this report',
    nullable: true,
  })
  imageId?: string;

  /**
   * Extra information about the report
   * OPTIONAL {string}
   *
   * @type {string}
   * @memberof CreateReportDto
   */
  @IsString()
  @Field(() => String, {
    description: 'Extra information',
    nullable: true,
  })
  extra?: string;

  /**
   * Information about where the report object is located; in the water or on land
   * REQUIRED {('water'|'land')}
   *
   * @type {('water' | 'land')}
   * @memberof CreateReportDto
   */
  @IsString()
  @Field(() => String, {
    description: 'Is this report for litter found in the water or on land?',
    defaultValue: 'water',
  })
  locationType: 'water' | 'land';

  /**
   * Description of the type of litter for the report
   * OPTIONAL {string}
   *
   * @type {string}
   * @memberof CreateReportDto
   */
  @IsString()
  @Field(() => String, {
    description: 'Type of litter the report is for',
    nullable: true,
  })
  litterType?: string;
}
