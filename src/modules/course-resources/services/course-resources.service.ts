import { Injectable } from '@nestjs/common';
import { CreateCourseResourceDto } from '../dtos/create-course-resource.dto';
import { CourseResources, CourseResourcesBuilder } from '../entities/course-resources.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindManyCourseResourcesBuilder } from '../builders/find-many-course-resources.builder';

@Injectable()
export class CourseResourcesService {
    @InjectRepository(CourseResources)
    courseResourcesRepository: Repository<CourseResources>;

    async findById(id: CourseResources['Id']) {}

    async findAllBy({ VehicleId, DriverId, CourseId }) {
        let options = new FindManyCourseResourcesBuilder()
            .setVehicle(VehicleId)
            .setDriver(DriverId)
            .setCourse(CourseId)
            .build();
        return this.courseResourcesRepository.find(options);
    }

    async create(dto: CreateCourseResourceDto) {
        const newEntity = new CourseResourcesBuilder()
            .setCourseId(dto.CourseId)
            .setVehicleId(dto.VehicleId)
            .setDriverId(dto.VehicleId)
            .build();

        return this.courseResourcesRepository.insert(newEntity);
    }

    async update() {}
    async delete() {}
}
