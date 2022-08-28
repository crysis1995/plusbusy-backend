import { Inject, Injectable } from '@nestjs/common';
import { Course } from '../entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseResourcesService } from '../../course-resources/services/course-resources.service';
import { Driver } from '../../driver/entities/driver.entity';
import { DateRange } from '../../../shared/values/date-range.value';
import { FindManyOptionsBuilder } from '../builders/find-many-options.builder';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { CreateCourseResourceDto } from '../../course-resources/dtos/create-course-resource.dto';

@Injectable()
export class CourseService {
    @InjectRepository(Course)
    private courseRepository: Repository<Course>;

    @Inject(CourseResourcesService)
    private courseResourcesService: CourseResourcesService;

    findById(courseId: Course['Id']) {
        return this.courseRepository.findOneBy({ Id: courseId });
    }

    findByDriver(driverId: Driver['Id'], dateRange: DateRange) {
        const options = new FindManyOptionsBuilder()
            .setCourseResourcesDriver(driverId)
            .setStartDate(dateRange.StartDate)
            .setEndDate(dateRange.EndDate)
            .build();
        return this.courseRepository.find(options);
    }
    findByVehicle(vehicleId: Vehicle['Id'], dateRange: DateRange) {}

    findAll() {
        return this.courseRepository.find();
    }

    create() {
    }

    update() {}

    delete() {}
}
