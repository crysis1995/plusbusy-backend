import { z } from 'nestjs-zod/z';
import { CreateCourseResourceDtoSchema } from '../../course-resources/dtos/create-course-resource.dto';

export const CourseResourcesSchema = z.array(CreateCourseResourceDtoSchema)