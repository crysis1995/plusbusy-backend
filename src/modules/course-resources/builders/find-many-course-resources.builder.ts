import { FindManyOptions } from 'typeorm';
import { CourseResources } from '../entities/course-resources.entity';

export class FindManyCourseResourcesBuilder {
    options: FindManyOptions<CourseResources>;
    constructor() {
        this.options = {};
    }
    setDriver(value: CourseResources['DriverId']) {
        if (value) {
            this.options.where = {
                ...this.options.where,
                DriverId: value
            };
        }
        return this;
    }

    setVehicle(value: CourseResources['VehicleId']) {
        if (value) {
            this.options.where = {
                ...this.options.where,
                VehicleId: value
            };
        }
        return this;
    }
    setCourse(value: CourseResources['CourseId']) {
        if (value) {
            this.options.where = {
                ...this.options.where,
                CourseId: value
            };
        }

        return this;
    }

    build() {
        return this.options;
    }
}
