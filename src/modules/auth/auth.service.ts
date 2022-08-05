import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserType } from '../users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { CredentialsPayloadType } from './entities/auth.entity';
import { BasicUserDto } from '../users/dtos/basic-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    @Inject(UsersService)
    private usersService: UsersService;

    @Inject(JwtService)
    private jwtService: JwtService;

    @Inject(ConfigService)
    private configService: ConfigService;

    async validateUser(UserName: UserType['Email'] | UserType['Nick'], password: UserType['Password']) {
        const user = await this.usersService.findByEmailOrNick({ UserName });
        if (user && user.Password === password) {
            return new BasicUserDto(user.Id, user.Email);
        }
        // throw new

        return null;
    }

    async loginWithCredentials({ UserId, UserEmail }: BasicUserDto) {
        const payload: CredentialsPayloadType = { UserId, UserEmail };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get<number>('AUTH_EXPIRATION_TIME_IN_SECONDS')
        });
        const expiresAt = this.getExpirationTime();
        return {
            accessToken,
            expiresAt
        };
    }

    getExpirationTime() {
        return Date.now().valueOf() + this.configService.get<number>('AUTH_EXPIRATION_TIME_IN_SECONDS') * 1000;
    }
}
