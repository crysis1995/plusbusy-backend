import { Body, Controller, Inject, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { BasicUserDto } from "../users/dtos/basic-user.dto";

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private authService: AuthService;

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.loginWithCredentials(req.user);
    }

    @Post('register')
    async register() {
        console.log('register');
    }

    @Post("password-reset")
    async passwordReset(@Body() body:BasicUserDto){

    }
}