import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Driver } from '../../driver/entities/driver.entity';
import { Course } from '../../course/entities/course.entity';
import { BuilderTemplate } from '../../../shared/shared.types';

@Index(['Vehicle', 'Driver', 'Course'], { unique: true })
@Index(['Driver', 'Course'], { unique: true })
@Entity()
export class CourseResources {
    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.Id)
    @JoinColumn({ name: 'VehicleId' })
    Vehicle: Vehicle;

    @Column()
    VehicleId: Vehicle['Id'];

    @ManyToOne(() => Driver, (driver) => driver.Id)
    @JoinColumn({ name: 'DriverId' })
    Driver: Driver;

    @Column()
    DriverId: Driver['Id'];

    @ManyToOne(() => Course, (course) => course.CourseResources)
    @JoinColumn({ name: 'CourseId' })
    Course: Course;

    @Column()
    CourseId: Course['Id'];
}

export class CourseResourcesBuilder extends BuilderTemplate<CourseResources> {
    constructor() {
        super(new CourseResources());
    }

    setId(value: CourseResources['Id']) {
        this.value.Id = value;
        return this;
    }
    setVehicleId(value: CourseResources['VehicleId']) {
        this.value.VehicleId = value;
        return this;
    }
    setDriverId(value: CourseResources['DriverId']) {
        this.value.DriverId = value;
        return this;
    }
    setCourseId(value: CourseResources['CourseId']) {
        this.value.CourseId = value;
        return this;
    }
}
