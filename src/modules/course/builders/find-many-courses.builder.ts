import { FindManyOptions } from 'typeorm';
import { Course } from '../entities/course.entity';
import { FindManyCourseResourcesBuilder } from '../../course-resources/builders/find-many-course-resources.builder';
import { CourseId } from '../values/course-id.value';
import { VehicleId } from '../../vehicle/values/vehicle-id.value';
import { DriverId } from '../../driver/values/driver-id.value';

export class FindManyCoursesBuilder {
    private readonly options: FindManyOptions<Course>;
    constructor() {
        this.options = {};
    }

    setCourseResources({
        courseId,
        vehicleId,
        driverId
    }: {
        courseId?: CourseId;
        vehicleId?: VehicleId;
        driverId?: DriverId;
    }) {
        const data = new FindManyCourseResourcesBuilder()
            .setCourse(courseId.value)
            .setVehicle(vehicleId.value)
            .setDriver(driverId.value)
            .build();
        this.options.where = {
            ...this.options.where,
            CourseResources: data.where
        };
        return this;
    }

    setStartDate(startDate: Course['StartDate']) {
        if (startDate) {
            this.options.where = {
                ...this.options.where,
                StartDate: startDate
            };
        }
        return this;
    }

    setEndDate(endDate: Course['EndDate']) {
        if (endDate) {
            this.options.where = {
                ...this.options.where,
                EndDate: endDate
            };
        }
        return this;
    }

    build() {
        return this.options;
    }
}
