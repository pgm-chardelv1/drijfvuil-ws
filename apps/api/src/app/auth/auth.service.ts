import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';
import { RegistrationStatus, JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate the password for the given user
   * then return the user if valid
   * or null if not valid
   *
   * @param {CreateUserDto} user
   * @return {*}  {(Promise<User | null >)}
   * @memberof AuthService
   */
  async validate(user: CreateUserDto): Promise<User | null> {
    const foundUser = await this.usersService.findByEmail(user.email);
    if (!foundUser) {
      return null;
    }
    const passwordIsValid = this.comparePasswords(
      user.password,
      await this.hashPassword(user.password),
    );
    return passwordIsValid ? foundUser : null;
  }

  /**
   * Log in with the given user credentials
   * then return the email and access_token
   * or a bad request exception
   *
   * @param {LoginUserDto} user
   * @return {*}  {(Promise<{ email: string, access_token: string } | BadRequestException>)}
   * @memberof AuthService
   */
  public async login(
    user: LoginUserDto,
  ): Promise<{ email: string; access_token: string } | BadRequestException> {
    return this.validate(user).then((userData) => {
      if (!userData) {
        return new BadRequestException(
          `Incorrect credentials. Please enter the correct email address and password.`,
        );
      }
      const payload: JwtPayload = {
        email: user.email,
        expires_in: '36000s',
        status: 200,
      };
      const access_token = this.jwtService.sign(payload);
      return {
        email: userData.email,
        access_token,
      };
    });
  }

  /**
   * Register a new user
   * then return the email and registration status
   *
   * @param {LoginUserDto} registrationData
   * @return {*}  {Promise<{ email: string, status: RegistrationStatus }>}
   * @memberof AuthService
   */
  public async register(
    registrationData: LoginUserDto,
  ): Promise<{ email: string; status: RegistrationStatus }> {
    const status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      // Create a new user with the given email and password;
      // Password gets hashed before insertion in the user service (see: '../users/entities/user.entity.ts' beforeInsert)
      await this.usersService.create({
        email: registrationData.email,
        password: registrationData.password,
      });
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException(`User with that email already exists.`);
      }
      throw new InternalServerErrorException(`Something went wrong`);
    }
    return {
      email: registrationData.email,
      status,
    };
  }

  /**
   * Verify the user by decoding the token, then return the user
   * or throw a new exception
   *
   * @param {string} token
   * @return {*}  {Promise<User>}
   * @memberof AuthService
   */
  async verify(token: string): Promise<User> {
    dotenv.config();
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    const user = this.usersService.findByEmail(decoded.email);

    if (!user) {
      throw new NotFoundException(
        'Unable to get the user from the decoded token.',
      );
    }

    return user;
  }

  /**
   * Hash the password with bcrypt and defined amount of salt rounds and return it
   *
   * @param {string} password
   * @return {*}  {Promise<string>}
   * @memberof AuthService
   */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  /**
   * Compare password and hashed password
   *
   * @param {string} password
   * @param {string} storedPasswordHash
   * @return {*} {Promise<boolean>}
   * @memberof AuthService
   */
  comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
