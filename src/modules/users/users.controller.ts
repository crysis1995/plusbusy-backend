import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BasicUserDto } from './dtos/basic-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    @Inject(UsersService)
    private usersService: UsersService;

    @Get('me')
    async getMe(@Request() req) {
        const dto: BasicUserDto = req.user;
        return await this.usersService.findById(dto.UserId);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.findById(id);
    }

    @Post() // maybe add any arg filters there
    async createUser(@Body() data: string) {
        console.log('register user');
    }

    @Put(':id')
    async updateUser() {
        console.log('update user');
    }

    @Delete(':id')
    async deleteUser() {
        console.log('delete user');
    }
}
