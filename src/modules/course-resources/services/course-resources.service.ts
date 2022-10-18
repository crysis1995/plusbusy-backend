import { Injectable } from '@nestjs/common';
import {
    CreateCourseResourceDto,
    CreateCourseResourceDtoSchema
} from '../dtos/create-course-resource.dto';
import { CourseResources, CourseResourcesBuilder } from '../entities/course-resources.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindManyCourseResourcesBuilder } from '../builders/find-many-course-resources.builder';
import { CourseResourceId } from '../values/course-resource-id.value';
import { SchemaValidator } from '../../../shared/shared.validator';

@Injectable()
export class CourseResourcesService {
    @InjectRepository(CourseResources)
    courseResourcesRepository: Repository<CourseResources>;

    async findById(id: CourseResourceId) {
        return this.courseResourcesRepository.findOneBy({ Id: id.value });
    }

    async findAllBy({ VehicleId, DriverId, CourseId }) {
        let options = new FindManyCourseResourcesBuilder()
            .setVehicle(VehicleId)
            .setDriver(DriverId)
            .setCourse(CourseId)
            .build();
        return this.courseResourcesRepository.find(options);
    }

    async create(resourceDto: CreateCourseResourceDto) {
        new SchemaValidator(CreateCourseResourceDtoSchema).validate(resourceDto);

        const newEntity = new CourseResourcesBuilder()
            .setCourseId(resourceDto.CourseId)
            .setVehicleId(resourceDto.VehicleId)
            .setDriverId(resourceDto.VehicleId)
            .build();

        return this.courseResourcesRepository.insert(newEntity);
    }

    async createMany(resourceDtos: CreateCourseResourceDto[]) {
        /*
         *   TODO Mozliwe ze trzeba to troche przerobic i inteligentniej sprawdzac
         *    czy dane sa ok itd
         * */
        return Promise.all(resourceDtos.map((dto) => this.create(dto)));
    }

    async delete(id: CourseResourceId) {
        await this.courseResourcesRepository.delete(id.value);
    }
}
