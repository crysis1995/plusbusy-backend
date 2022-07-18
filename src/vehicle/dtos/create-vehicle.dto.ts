import { BuilderTemplate } from '../../shared.types';

export class CreateVehicleDto {
    ShortName: string;
    Plates: string;
    SeatsCount: number;
}

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
}
