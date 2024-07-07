import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  private client = jwksRsa({
    jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
  });

  private getKey = (header, callback) => {
    this.client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return callback(err, null);
      }
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    });
  };

  private decodeToken = async (token: string): Promise<any> => {
    console.log(process.env.COGNITO_CLIENT_ID);
    try {
      const verify = promisify(jwt.verify.bind(jwt));
      const decoded = await verify(token, this.getKey, {
        issuer: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
        algorithms: ['RS256'],
      });

      return decoded;
    } catch (err) {
      console.log(err);
      this.logger.error('Token validation error', err);
      throw err;
    }
  };

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
      }),
    });
    this.logger.log('JwtStrategy initialized');
  }

  async validate(payload: any) {
    this.logger.log(`Validating JWT payload: ${JSON.stringify(payload)}`);
    return payload;
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const decodedToken = await this.decodeToken(token);
      this.logger.log(`Decoded Token: ${JSON.stringify(decodedToken)}`);
      return true;
    } catch (err) {
      this.logger.error('Token validation failed', err);
      return false;
    }
  }
}
