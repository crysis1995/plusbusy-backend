import { BuilderTemplate } from '../../../shared/shared.types';
import { z } from 'nestjs-zod/z';
import { ShortNameSchema } from '../schemas/short-name.schema';
import { PlatesSchema } from '../schemas/plates.schema';
import { SeatsCountSchema } from '../schemas/seats-count.schema';
import { createZodDto } from 'nestjs-zod';

export const UpdateVehicleDtoSchema = z.object({
    ShortName: ShortNameSchema.optional(),
    Plates: PlatesSchema.optional(),
    SeatsCount: SeatsCountSchema.optional()
});

export class UpdateVehicleDto extends createZodDto(UpdateVehicleDtoSchema) {}

export class UpdateVehicleDtoBuilder extends BuilderTemplate<UpdateVehicleDto> {
    constructor() {
        super(new UpdateVehicleDto());
    }

    setShortName(ShortName: string) {
        this.value.ShortName = ShortName;
        return this;
    }

    setPlates(Plates: string) {
        this.value.Plates = Plates;
        return this;
    }

    setSeatsCount(SeatsCount: number) {
        this.value.SeatsCount = SeatsCount;
        return this;
    }
}
