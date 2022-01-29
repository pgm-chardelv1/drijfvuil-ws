import { Field, ArgsType, Int } from '@nestjs/graphql';
import { PaginationArgs } from './pagination.args';

/**
 * Query arguments for Reports
 *
 * @export
 * @class GetReportsArgs
 */
@ArgsType()
export class GetReportsArgs extends PaginationArgs {
  @Field(() => Int, { nullable: true, defaultValue: 9000 })
  cityId?: number;

  @Field(() => Int, { nullable: true })
  quarterId?: number;
}
