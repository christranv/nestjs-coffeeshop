import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import TokenPayload from '@src/shared/api/auth/token-payload.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import AuthConfig from './auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const config = configService.get<AuthConfig>('auth');
        if (!config) throw new Error('Missing auth config');

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.secret,
        });
    }

    async validate(payload: TokenPayload) {
        return payload;
    }
}