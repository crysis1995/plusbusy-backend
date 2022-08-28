import { Module } from '@nestjs/common';
import { CourseResourcesController } from './controllers/course-resources.controller';
import { CourseResourcesService } from './services/course-resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/entities/course.entity';
import { CourseResources } from './entities/course-resources.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course, CourseResources])],
    controllers: [CourseResourcesController],
    providers: [CourseResourcesService]
})
export class CourseResourcesModule {}
