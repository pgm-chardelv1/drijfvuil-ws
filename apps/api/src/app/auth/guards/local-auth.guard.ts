import { AuthGuard } from '@nestjs/passport';

/**
 * Local auth guard
 *
 * @export LocalAuthGuard
 * @class LocalAuthGuard
 * @extends {AuthGuard('local')}
 */
export class LocalAuthGuard extends AuthGuard('local') {}
