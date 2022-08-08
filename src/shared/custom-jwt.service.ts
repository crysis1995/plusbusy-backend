import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomJwtService implements JwtOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
        return {
            secret: this.config.get<string>('AUTH_SECRET_KEY'),
            signOptions: {
                expiresIn: `${this.config.get<number>(
                    'AUTH_EXPIRATION_TIME_IN_SECONDS'
                )}s`
            }
        };
    }
}
