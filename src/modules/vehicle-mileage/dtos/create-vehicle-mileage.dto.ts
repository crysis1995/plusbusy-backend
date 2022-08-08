import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const CreateVehicleMileageDtoSchema = z.object({
    VehicleId: z.number().int(),
    MileageKm: z.number().min(0),
    Date: z.date()
});

export class CreateVehicleMileageDto extends createZodDto(
    CreateVehicleMileageDtoSchema
) {}
