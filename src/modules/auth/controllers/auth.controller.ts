import { Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth-guard';
import { BasicUserDto } from '../../users/dtos/basic-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginPayload } from '../entities/login.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private authService: AuthService;

    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginPayload })
    @Post('login')
    async login(@Request() req) {
        return this.authService.loginWithCredentials(req.user);
    }

    @Post('register')
    async register() {
        console.log('register');
    }

    @Post('password-reset')
    async passwordReset(@Body() body: BasicUserDto) {}
}
