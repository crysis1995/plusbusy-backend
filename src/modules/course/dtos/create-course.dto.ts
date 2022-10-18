import { z } from 'nestjs-zod/z';
import { NoteSchema } from '../schemas/note.schema';
import { StartDateSchema } from '../schemas/start-date.schema';
import { EndDateSchema } from '../schemas/end-date.schema';
import { CourseTypeSchema } from '../schemas/course-type.schema';
import { CourseResourcesSchema } from '../schemas/course-resources.schema';
import { createZodDto } from 'nestjs-zod';

export const CreateCourseDtoSchema = z.object({
    Note: NoteSchema,
    StartDate: StartDateSchema,
    EndDate: EndDateSchema,
    CourseType: CourseTypeSchema,
    CourseResources: CourseResourcesSchema.optional()
});

export class CreateCourseDto extends createZodDto(CreateCourseDtoSchema) {}
