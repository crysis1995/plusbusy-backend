import { BuilderTemplate } from '../../shared.types';

export class UpdateVehicleDto {
    ShortName: string = undefined;
    Plates: string = undefined;
    SeatsCount: number = undefined;
}

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
