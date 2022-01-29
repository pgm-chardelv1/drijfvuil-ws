import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateReportDto } from './create-report.dto';

/**
 * Defines the input type for updating a report
 *
 * @export UpdateReportDto
 * @class UpdateReportDto
 * @extends {PartialType(CreateReportDto)}
 */
@InputType()
export class UpdateReportDto extends PartialType(CreateReportDto) {
  /**
   * Required field {id}: number (Integer)
   *
   * @type {number}
   * @memberof UpdateReportDto
   */
  @IsInt()
  @Field(() => Int)
  id: number;
}
