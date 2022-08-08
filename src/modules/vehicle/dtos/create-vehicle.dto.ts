import { BuilderTemplate } from '../../../shared/shared.types';
import { Validator } from '../../../shared/shared.validator';
import { Vehicle } from '../entities/vehicle.entity';
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const CreateVehicleDtoSchema = z.object({
    ShortName: z.string(),
    Plates: z.string(),
    SeatsCount: z.number().int(),
    CompanyId: z.string().uuid()
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

export class CreateVehicleDtoValidator extends Validator<Vehicle> {}
