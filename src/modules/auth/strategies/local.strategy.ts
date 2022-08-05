import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    @Inject(AuthService)
    private authService: AuthService;

    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password);
        if (!user) throw new UnauthorizedException();

        return user;
    }
}