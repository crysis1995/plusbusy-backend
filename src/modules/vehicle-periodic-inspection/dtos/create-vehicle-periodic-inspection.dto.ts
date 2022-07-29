import { BuilderTemplate } from "../../../shared/shared.types";

export class CreateVehiclePeriodicInspectionDto {
    VehicleId: number;
    FromDate: Date;
    ToDate: Date;
    InspectionType: string;
}

export class CreateVehiclePeriodicInspectionDtoBuilder extends BuilderTemplate<CreateVehiclePeriodicInspectionDto> {
    constructor() {
        super(new CreateVehiclePeriodicInspectionDto());
    }

    setVehicleId(value: CreateVehiclePeriodicInspectionDto['VehicleId']) {
        this.value.VehicleId = value;
        return this;
    }
    setFromDate(value: CreateVehiclePeriodicInspectionDto['FromDate']) {
        this.value.FromDate = value;
        return this;
    }
    setToDate(value: CreateVehiclePeriodicInspectionDto['ToDate']) {
        this.value.ToDate = value;
        return this;
    }
    setInspectionType(value: CreateVehiclePeriodicInspectionDto['InspectionType']) {
        this.value.InspectionType = value;
        return this;
    }
}
