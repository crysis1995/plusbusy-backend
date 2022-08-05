import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CredentialsPayloadType } from '../entities/auth.entity';
import { BasicUserDto } from '../../users/dtos/basic-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('AUTH_SECRET_KEY')
        });
    }

    async validate(payload: CredentialsPayloadType) {
        return new BasicUserDto(payload.UserId, payload.UserEmail);
    }
}
