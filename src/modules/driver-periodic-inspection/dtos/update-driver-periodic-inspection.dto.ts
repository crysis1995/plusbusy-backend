import { z } from 'nestjs-zod/z';
import { NoteScheme } from '../schemas/note.scheme';
import { createZodDto } from 'nestjs-zod';

export const UpdateDriverPeriodicInspectionDtoScheme = z.object({
    Note: NoteScheme
});

export class UpdateDriverPeriodicInspectionDto extends createZodDto(
    UpdateDriverPeriodicInspectionDtoScheme
) {}
