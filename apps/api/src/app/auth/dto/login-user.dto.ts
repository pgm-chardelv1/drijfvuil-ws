import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

/**
 * Define the input type for performing a user login
 *
 * @export LoginUserDto
 * @class LoginUserDto
 */
@InputType()
export class LoginUserDto {
  @Field({ description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @Field({ description: 'User password' })
  @IsNotEmpty()
  @Min(8)
  @Max(42)
  readonly password: string;
}
