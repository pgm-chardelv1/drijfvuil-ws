import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import * as dotenv from 'dotenv';
import { User } from '../../users/entities/user.entity';

dotenv.config();
/**
 * Strategy for authentication using JSON web tokens
 * Set secret and define validation
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpirationDate: false,
      secretOrKey: process.env.JWT_SECRET
        ? process.env.JWT_SECRET
        : "I'm a test key",
    });
  }

  async validate(validationPayload: {
    email: string;
    sub: string;
  }): Promise<User> | null {
    return this.usersService.findByEmail(validationPayload.email);
  }
}
