import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

export const VehicleIdDtoSchema = z.object({
    VehicleId: z.number().int()
});

export class VehicleIdDto extends createZodDto(VehicleIdDtoSchema) {
    constructor(VehicleId: Vehicle['Id']) {
        super();
        this.VehicleId = VehicleId;
    }
}
