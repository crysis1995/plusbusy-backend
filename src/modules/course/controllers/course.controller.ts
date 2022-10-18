import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query, UseGuards
} from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { CourseId } from '../values/course-id.value';
import { RequestTypeEnum } from '../enums/request-type.enum';
import { ParseRequestTypeEnumPipe } from '../pipes/parse-request-type-enum.pipe';
import { DateRangeBuilder } from '../../../shared/values/date-range.value';
import { ParseDatePipe } from '../../../shared/pipes/parse-date.pipe';
import { DriverId } from '../../driver/values/driver-id.value';
import { VehicleId } from '../../vehicle/values/vehicle-id.value';
import { UpdateCourseDto } from '../dtos/update-course.dto';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Course')
@UseGuards(JwtAuthGuard)
@Controller('course')
export class CourseController {
    @Inject(CourseService)
    private courseService: CourseService;

    @Get()
    getAll() {
        return this.courseService.findAll();
    }

    @Get(':by/:id')
    getAllBy(
        @Param('by', ParseRequestTypeEnumPipe) byType: RequestTypeEnum,
        @Param('id', ParseIntPipe) id: number,
        @Query('startDate', ParseDatePipe) startDate: Date,
        @Query('endDate', ParseDatePipe) endDate: Date
    ) {
        const dateRange = new DateRangeBuilder()
            .setStartDate(startDate)
            .setEndDate(endDate)
            .build();
        if (byType === RequestTypeEnum.BY_COURSE) {
            return this.courseService.findAllByCourses(new CourseId(id), dateRange);
        } else if (byType === RequestTypeEnum.BY_DRIVER) {
            return this.courseService.findAllByDriver(new DriverId(id), dateRange);
        } else if (byType === RequestTypeEnum.BY_VEHICLE) {
            return this.courseService.findAllByVehicle(new VehicleId(id), dateRange);
        } else {
            throw new BadRequestException('You need to provide any type');
        }
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.findById(new CourseId(id));
    }

    @Post()
    async create(@Body() dto: CreateCourseDto) {
        return await this.courseService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCourseDto) {
        return await this.courseService.update(new CourseId(id), dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.courseService.delete(new CourseId(id));
    }
}
