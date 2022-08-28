import { FindManyOptions } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CourseResources } from '../../course-resources/entities/course-resources.entity';

export class FindManyOptionsBuilder {
    options: FindManyOptions<Course>;
    constructor() {
        this.options = {};
    }

    setCourseResourcesDriver(driverId: CourseResources['DriverId']) {
        this.options.where = {
            ...this.options.where,
            CourseResources: {
                DriverId: driverId
            }
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

    build(){
        return this.options
    }
}
