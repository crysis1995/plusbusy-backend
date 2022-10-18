import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { CourseTypeEnum } from '../enums/course-type.enum';
import { CourseResources } from '../../course-resources/entities/course-resources.entity';
import { BuilderTemplate } from '../../../shared/shared.types';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column('text')
    Note: string;

    @Column("timestamp with time zone")
    // @Column('datetime')
    StartDate: Date;

    @Column("timestamp with time zone")
    // @Column('datetime')
    EndDate: Date;

    @Column({ type: 'simple-enum', enum: CourseTypeEnum })
    CourseType: CourseTypeEnum;

    @OneToMany(() => CourseResources, (cr) => cr.Course)
    CourseResources: CourseResources[];
}

export class CourseBuilder extends BuilderTemplate<Course> {
    constructor() {
        super(new Course());
    }

    setId(value: Course['Id']) {
        this.value.Id = value;
        return this;
    }
    setNote(value: Course['Note']) {
        this.value.Note = value;
        return this;
    }
    setStartDate(value: Course['StartDate']) {
        this.value.StartDate = value;
        return this;
    }
    setEndDate(value: Course['EndDate']) {
        this.value.EndDate = value;
        return this;
    }
    setCourseType(value: Course['CourseType']) {
        this.value.CourseType = value;
        return this;
    }
}
