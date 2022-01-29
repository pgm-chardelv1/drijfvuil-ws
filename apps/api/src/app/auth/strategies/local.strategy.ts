import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../users/entities/user.entity';
import { CreateUserDto } from '../../users/dto/create-user.dto';

/**
 * Local authentication strategy
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(user: CreateUserDto): Promise<User> {
    const foundUser = await this.authService.validate(user);

    if (!foundUser) {
      throw new UnauthorizedException(
        `We could not validate you with these credentials. Please try again or contact your administrator.`,
      );
    }

    return foundUser;
  }
}
