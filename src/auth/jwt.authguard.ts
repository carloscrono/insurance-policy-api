import { ExecutionContext, Injectable, Logger, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);
  private jwtStrategy: JwtStrategy = new JwtStrategy();

  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      this.logger.error('No token found in request');
      return false;
    }

    this.logger.log(`Request headers: ${JSON.stringify(token)}`);

    const isValid = await this.jwtStrategy.validateToken(token);

    if (!isValid) {
      this.logger.error('Token validation failed');
      return false;
    }

    return true;
  }
}
