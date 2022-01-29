import { BadRequestException, Logger, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';

import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { GqlThrottlerGuard } from './guards/gql-throttler.guard';
import { RegistrationStatus, RequestWithUser } from './interfaces';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  /**
   * Log in with an existing user's email and password
   * returns an access token in the logs or throws a new exception
   *
   * @param {LoginUserDto} user
   * @return {*}  {(Promise<{ email: string, access_token: string } | BadRequestException>)}
   * @memberof AuthResolver
   */
  @Mutation(() => User)
  async login(
    @Args('user') user: LoginUserDto,
  ): Promise<{ email: string; access_token: string } | BadRequestException> {
    return await this.authService.login(user);
  }

  /**
   * Mutation to register a new User
   *
   * @param {string} email
   * @param {string} password
   * @return {*} {Promise<{ email: string, status: RegistrationStatus }>}
   * @memberof AuthResolver
   */
  @UseGuards(GqlThrottlerGuard, GqlAuthGuard)
  @Throttle(60, 60)
  @Mutation(() => User)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: { req: RequestWithUser },
  ): Promise<{ email: string; status: RegistrationStatus }> {
    Logger.log(`New user registration initiated by: ${context.req.user.email}`);
    return this.authService.register({ email, password });
  }
}
