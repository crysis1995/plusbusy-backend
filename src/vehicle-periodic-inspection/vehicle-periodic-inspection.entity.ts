import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import { BuilderTemplate } from '../shared.types';
import {Vehicle} from "../vehicle/vehicle.entity";

@Entity()
export class VehiclePeriodicInspection {
    @OneToMany(type => Vehicle, vehicle => vehicle.Id)
    VehicleId: number;

    @PrimaryColumn()
    FromDate: Date;

    @PrimaryColumn()
    ToDate: Date;

    @PrimaryColumn()
    InspectionType: string;
}

export class VehiclePeriodicInspectionBuilder extends BuilderTemplate<VehiclePeriodicInspection> {
    constructor() {
        super(new VehiclePeriodicInspection());
    }

    setVehicleId(VehicleId: VehiclePeriodicInspection['VehicleId']) {
        this.value.VehicleId = VehicleId;
        return this;
    }

    setFromDate(fromDate: VehiclePeriodicInspection['FromDate']) {
        this.value.FromDate = fromDate;
        return this;
    }

    setToDate(toDate: VehiclePeriodicInspection['ToDate']) {
        this.value.ToDate = toDate;
        return this;
    }

    setInspectionType(
        inspectionType: VehiclePeriodicInspection['InspectionType']
    ) {
        this.value.InspectionType = inspectionType;
        return this;
    }
}
