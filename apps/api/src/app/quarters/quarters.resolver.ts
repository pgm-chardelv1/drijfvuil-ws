import { Logger, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RequestWithUser } from '../auth/interfaces';
import { CreateQuarterDto } from './dto/create-quarter.dto';
import { UpdateQuarterDto } from './dto/update-quarter.dto';
import { Quarter } from './entities/quarter.entity';
import { QuartersService } from './quarters.service';

@Resolver(() => Quarter)
export class QuartersResolver {
  constructor(private quartersService: QuartersService) {}

  /**
   * Get one quarter by ID
   * @param quarter ID
   * @returns one quarter with given ID
   */
  @Query(() => Quarter, { name: 'quarter' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Quarter> {
    return this.quartersService.findOne(id);
  }

  /**
   * Get all quarters
   * @returns all quarters
   */
  @Query(() => [Quarter], { name: 'quarters' })
  findAll(): Promise<Quarter[]> {
    return this.quartersService.findAll();
  }

  /**
   * Create a new quarter
   * @param createQuarterInput
   * @returns the created quarter
   */
  @Mutation(() => Quarter)
  @UseGuards(GqlAuthGuard)
  createQuarter(
    @Args('createQuarterInput') createQuarterInput: CreateQuarterDto,
    @Context() context: { req: RequestWithUser },
  ): Promise<Quarter> {
    Logger.log(`Quarter #${createQuarterInput.id} created by: ${context.req.user.email}`);
    return this.quartersService.create(createQuarterInput);
  }

  @Mutation(() => Quarter)
  @UseGuards(GqlAuthGuard)
  updateQuarter(
    @Args('updateQuarterInput') updateQuarterInput: UpdateQuarterDto,
    @Context() context: { req: RequestWithUser },
  ): Promise<Quarter> {
    Logger.log(`Quarter #${updateQuarterInput.id} updated by: ${context.req.user.email}`);
    return this.quartersService.update(updateQuarterInput.id, updateQuarterInput);
  }

  @Mutation(() => Quarter)
  @UseGuards(GqlAuthGuard)
  deleteQuarter(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: { req: RequestWithUser },
  ): Promise<Quarter> {
    Logger.log(`Quarter #${id} deleted by: ${context.req.user.email}`);
    return this.quartersService.remove(id);
  }
}
