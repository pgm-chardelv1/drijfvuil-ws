import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

/**
 * Define the interface for the JwtPayload
 *
 * @export JwtPayload
 * @interface JwtPayload
 */
export interface JwtPayload {
  email: string;
  expires_in: string;
  status: number;
}

/**
 * Define the registration status object
 *
 * @export RegistrationStatus
 * @interface RegistrationStatus
 */
export interface RegistrationStatus {
  success: boolean;
  message: string;
}

/**
 * Define the interface for sending a user with a request
 *
 * @export RequestWithUser
 * @interface RequestWithUser
 * @extends {Request}
 */
export interface RequestWithUser extends Request {
  user: User;
}
