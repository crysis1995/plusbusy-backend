import { z } from 'nestjs-zod/z';
import { CourseTypeEnum } from '../enums/course-type.enum';

export const CourseTypeSchema = z.nativeEnum(CourseTypeEnum);
