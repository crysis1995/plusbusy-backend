import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Course resources')
@UseGuards(JwtAuthGuard)
@Controller('course-resources')
export class CourseResourcesController {
    @Get()
    getById() {}
}
