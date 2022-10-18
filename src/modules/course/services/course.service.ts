import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Course, CourseBuilder } from '../entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseResourcesService } from '../../course-resources/services/course-resources.service';
import { DateRange } from '../../../shared/values/date-range.value';
import { FindManyCoursesBuilder } from '../builders/find-many-courses.builder';
import { CourseId } from '../values/course-id.value';
import { DriverId } from '../../driver/values/driver-id.value';
import { VehicleId } from '../../vehicle/values/vehicle-id.value';
import { CreateCourseDto, CreateCourseDtoSchema } from '../dtos/create-course.dto';
import { SchemaValidator } from '../../../shared/shared.validator';
import { UpdateCourseDto, UpdateCourseDtoSchema } from '../dtos/update-course.dto';

@Injectable()
export class CourseService {
    @InjectRepository(Course)
    private courseRepository: Repository<Course>;
    @Inject(CourseResourcesService)
    private courseResourcesService: CourseResourcesService;

    findById(courseId: CourseId) {
        return this.courseRepository.findOneBy({ Id: courseId.value });
    }

    findAllByCourses(courseId: CourseId, dateRange: DateRange) {
        const options = new FindManyCoursesBuilder()
            .setStartDate(dateRange.StartDate)
            .setEndDate(dateRange.EndDate)
            .setCourseResources({ courseId })
            .build();

        return this.courseRepository.find(options);
    }

    findAllByDriver(driverId: DriverId, dateRange: DateRange) {
        const options = new FindManyCoursesBuilder()
            .setStartDate(dateRange.StartDate)
            .setEndDate(dateRange.EndDate)
            .setCourseResources({ driverId })
            .build();

        return this.courseRepository.find(options);
    }
    findAllByVehicle(vehicleId: VehicleId, dateRange: DateRange) {
        const options = new FindManyCoursesBuilder()
            .setStartDate(dateRange.StartDate)
            .setEndDate(dateRange.EndDate)
            .setCourseResources({ vehicleId })
            .build();

        return this.courseRepository.find(options);
    }

    findAll() {
        return this.courseRepository.find();
    }

    async create(dto: CreateCourseDto) {
        new SchemaValidator(CreateCourseDtoSchema).validate(dto);

        const entity = new CourseBuilder()
            .setNote(dto.Note)
            .setStartDate(dto.StartDate)
            .setEndDate(dto.EndDate)
            .setCourseType(dto.CourseType)
            .build();

        const saved = await this.courseRepository.save(entity);
        if (dto.CourseResources) {
            await this.courseResourcesService.createMany(dto.CourseResources);
            return this.courseRepository.preload(saved);
        }

        return saved;
    }

    async update(courseId: CourseId, dto: UpdateCourseDto) {
        new SchemaValidator(UpdateCourseDtoSchema).validate(dto);
        const existed = await this.findById(courseId);
        if (!existed) throw new NotFoundException();

        const entity = new CourseBuilder()
            .setNote(dto.Note)
            .setStartDate(dto.StartDate)
            .setEndDate(dto.EndDate)
            .setCourseType(dto.CourseType)
            .build();

        return this.courseRepository.update(existed.Id, entity);
    }

    async delete(courseId: CourseId) {
        await this.courseRepository.delete(courseId.value);
    }
}
