import { z } from 'nestjs-zod/z';
import { VehicleSchema } from '../schemas/vehicle.schema';
import { DriverSchema } from '../schemas/driver.schema';
import { CourseSchema } from '../schemas/course.schema';
import { createZodDto } from 'nestjs-zod';

export const CreateCourseResourceDtoSchema = z.object({
    VehicleId: VehicleSchema,
    DriverId: DriverSchema,
    CourseId: CourseSchema
});

export class CreateCourseResourceDto extends createZodDto(CreateCourseResourceDtoSchema) {}
