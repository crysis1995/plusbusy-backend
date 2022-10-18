import { z } from 'nestjs-zod/z';
import { NoteSchema } from '../schemas/note.schema';
import { StartDateSchema } from '../schemas/start-date.schema';
import { EndDateSchema } from '../schemas/end-date.schema';
import { CourseTypeSchema } from '../schemas/course-type.schema';
import { createZodDto } from 'nestjs-zod';

export const UpdateCourseDtoSchema = z.object({
    Note: NoteSchema.optional(),
    StartDate: StartDateSchema.optional(),
    EndDate: EndDateSchema.optional(),
    CourseType: CourseTypeSchema.optional()
});

export class UpdateCourseDto extends createZodDto(UpdateCourseDtoSchema) {}
