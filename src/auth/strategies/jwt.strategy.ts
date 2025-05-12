import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../../user/domain/models/token-payload.model';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'default_secret_key',
        });
    }

    validate(payload: TokenPayload) {
        return {
            userId: payload.userId,
            email: payload.email,
            roles: payload.roles
        };
    }
}