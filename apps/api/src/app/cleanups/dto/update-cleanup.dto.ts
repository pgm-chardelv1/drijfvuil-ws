import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateCleanupDto } from './create-cleanup.dto';

/**
 * Input type for updating an existing Cleanup object
 *
 * @export UpdateCleanupDto
 * @class UpdateCleanupDto
 * @extends {PartialType(CreateCleanupDto)}
 */
@InputType()
export class UpdateCleanupDto extends PartialType(CreateCleanupDto) {
  @IsInt()
  @Field(() => Int)
  id: number;
}
