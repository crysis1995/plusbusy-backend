import { Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseController } from './controllers/course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseResources } from '../course-resources/entities/course-resources.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, CourseResources])],
    providers: [CourseService],
    controllers: [CourseController]
})
export class CourseModule {}
