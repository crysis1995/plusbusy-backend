import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomJwtService } from '../../shared/custom-jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        PassportModule,
        JwtModule.registerAsync({
            useClass: CustomJwtService
        })
    ],
    providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
