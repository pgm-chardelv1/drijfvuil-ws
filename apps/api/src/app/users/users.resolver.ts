import {
  Logger,
  ParseUUIDPipe,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RequestWithUser } from '../auth/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  /**
   * Query user by ID (uuid)
   *
   * @param {string} id
   * @return {*} {Promise<User>}
   * @memberof UsersResolver
   */
  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  /**
   * Query all users
   *
   * @return {*}  {Promise<User[]>}
   * @memberof UsersResolver
   */
  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Mutation to create a new user
   *
   * @param {CreateUserDto} createUserDto
   * @return {*}  {Promise<User>}
   * @memberof UsersResolver
   */
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  /**
   * Mutation to update one user
   *
   * @param {UpdateUserDto} updateUserInput
   * @return {*}  {Promise<User>}
   * @memberof UsersResolver
   */
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
    @Context() context: { req: RequestWithUser },
  ): Promise<User> {
    if (context.req.user.id === updateUserInput.id) {
      return this.usersService.update(updateUserInput.id, updateUserInput);
    } else {
      throw new UnauthorizedException(
        `You can only update your own user info.`,
      );
    }
  }

  /**
   * Mutation to delete one user by ID
   *
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof UsersResolver
   */
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  deleteUser(
    @Args('id') id: string,
    @Context() context: { req: RequestWithUser },
  ): Promise<User> {
    Logger.log(`User #${id} deleted by: ${context.req.user.email}`);
    return this.usersService.remove(id);
  }
}
