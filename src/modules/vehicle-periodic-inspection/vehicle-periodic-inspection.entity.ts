import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { BuilderTemplate } from '../../shared/shared.types';
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class VehiclePeriodicInspection {
    @ManyToOne((type) => Vehicle, (vehicle) => vehicle.Id)
    @JoinColumn({ name: 'VehicleId' })
    Vehicle: Vehicle;

    @PrimaryColumn()
    VehicleId: number;

    @PrimaryColumn()
    FromDate: Date;

    @PrimaryColumn()
    ToDate: Date;

    @PrimaryColumn()
    InspectionType: string;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}

export class VehiclePeriodicInspectionBuilder extends BuilderTemplate<VehiclePeriodicInspection> {
    constructor() {
        super(new VehiclePeriodicInspection());
    }

    setVehicle(Vehicle: VehiclePeriodicInspection['Vehicle']) {
        this.value.Vehicle = Vehicle;
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

    setInspectionType(inspectionType: VehiclePeriodicInspection['InspectionType']) {
        this.value.InspectionType = inspectionType;
        return this;
    }
}
