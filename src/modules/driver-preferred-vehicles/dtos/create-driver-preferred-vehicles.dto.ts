import { z } from 'nestjs-zod/z';
import { DriverIdSchema } from '../schemas/driver-id.schema';
import { VehicleIdSchema } from '../schemas/vehicle-id.schema';
import { NoteSchema } from '../schemas/note.schema';
import { createZodDto } from 'nestjs-zod';

export const CreateDriverPreferredVehiclesDtoSchema = z.object({
    DriverId: DriverIdSchema,
    VehicleId: VehicleIdSchema,
    Note: NoteSchema
});

export class CreateDriverPreferredVehiclesDto extends createZodDto(
    CreateDriverPreferredVehiclesDtoSchema
) {}
