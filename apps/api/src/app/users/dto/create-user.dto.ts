import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

/**
 * Declare the input type for creating a new user
 * Fields: email, password
 *
 * @exports CreateUserDto
 * @class CreateUserDto
 */
@InputType()
export class CreateUserDto {
  /**
   * Email for the user; will be used as username
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, {
    description: "User email address. Has to be a valid email. Can't be empty.",
  })
  email: string;

  /**
   * Password for the user
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsNotEmpty()
  @Min(8)
  @Max(42)
  @Field(() => String, {
    description:
      "User password. Has to be minimum 8 characters, maximum 42 characters. Can't be empty.",
  })
  password: string;
}
