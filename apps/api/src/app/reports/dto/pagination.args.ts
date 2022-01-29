import { ArgsType, Field, Int } from '@nestjs/graphql';

/**
 * Pagination Arguments for Reports query
 *
 * @class PaginationArgs
 */
@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  offset = 0;

  @Field(() => Int)
  limit = 30;
}
