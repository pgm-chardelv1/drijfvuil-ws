import { AuthGuard } from '@nestjs/passport';

/**
 * JWT Authentication guard
 *
 * @export JwtAuthGuard
 * @class JwtAuthGuard
 * @extends {AuthGuard('jwt')}
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}
