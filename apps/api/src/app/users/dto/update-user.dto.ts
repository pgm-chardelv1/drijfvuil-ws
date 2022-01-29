import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * Declare the input type for updating an existing user
 * Required field: id (uuid)
 * Optional fields from CreateUserDto: email, password
 *
 * @class UpdateUserDto
 * @extends {PartialType(CreateUserDto)}
 */
@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID()
  @Field(() => String, {
    description: 'ID for the user. Has to be a valid UUID.',
  })
  id: string;
}
