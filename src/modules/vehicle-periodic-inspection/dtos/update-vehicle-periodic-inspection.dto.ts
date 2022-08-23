import { z } from 'nestjs-zod/z';
import { NoteSchema } from '../schemas/note.schema';
import { createZodDto } from 'nestjs-zod';

export const UpdateVehiclePeriodicInspectionDtoSchema = z.object({
    Note: NoteSchema.optional()
});

export class UpdateVehiclePeriodicInspectionDto extends createZodDto(
    UpdateVehiclePeriodicInspectionDtoSchema
) {}
