import { z } from 'nestjs-zod/z';
import { NoteSchema } from '../schemas/note.schema';
import { createZodDto } from 'nestjs-zod';

export const UpdateDriverPreferredVehiclesDtoSchema = z.object({
    Note: NoteSchema
});

export class UpdateDriverPreferredVehiclesDto extends createZodDto(UpdateDriverPreferredVehiclesDtoSchema){}