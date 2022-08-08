import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Inject,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { RequestData, RequestWithUser } from '../../shared/shared.types';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    @Inject(UsersService)
    private usersService: UsersService;

    @Get('me')
    async getMe(@Request() req: RequestWithUser) {
        return await this.usersService.findById(new RequestData(req));
    }

    // @Get(':id')
    // async findById(@Param('id', ParseIntPipe) id: number,@Request() req:RequestWithUser) {
    //     return await this.usersService.findById(new UserId(id),new RequestData(req));
    // }

    // @Post() // maybe add any arg filters there
    // async createUser(@Body() data: string,@Request() req:RequestWithUser) {
    //     console.log('register user');
    // }
    //
    // @Put(':id')
    // async updateUser(@Request() req:RequestWithUser) {
    //     this.usersService.
    // }
}
