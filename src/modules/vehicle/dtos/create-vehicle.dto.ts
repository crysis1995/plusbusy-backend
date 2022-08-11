import { BuilderTemplate } from '../../../shared/shared.types';
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ShortNameSchema } from '../schemas/short-name.schema';
import { PlatesSchema } from '../schemas/plates.schema';
import { SeatsCountSchema } from '../schemas/seats-count.schema';
import { CompanyIdSchema } from '../schemas/company-id.schema';

export const CreateVehicleDtoSchema = z.object({
    ShortName: ShortNameSchema,
    Plates: PlatesSchema,
    SeatsCount: SeatsCountSchema,
    CompanyId: CompanyIdSchema
});

export class CreateVehicleDto extends createZodDto(CreateVehicleDtoSchema) {}

export class CreateVehicleDtoBuilder extends BuilderTemplate<CreateVehicleDto> {
    constructor() {
        super(new CreateVehicleDto());
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

    setCompany(value: string) {
        this.value.CompanyId = value;
    }
}
