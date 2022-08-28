import { z } from 'nestjs-zod/z';

export const CourseSchema = z.number().int().positive();
