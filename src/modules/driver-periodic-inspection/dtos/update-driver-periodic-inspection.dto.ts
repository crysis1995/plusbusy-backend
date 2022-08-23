import { z } from 'nestjs-zod/z';
import { NoteSchema } from '../schemas/note.schema';
import { createZodDto } from 'nestjs-zod';

export const UpdateDriverPeriodicInspectionDtoScheme = z.object({
    Note: NoteSchema
});

export class UpdateDriverPeriodicInspectionDto extends createZodDto(
    UpdateDriverPeriodicInspectionDtoScheme
) {}
