import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import { BuilderTemplate } from '../../../shared/shared.types';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { VehicleInspectionTypeEnum } from '../enums/vehicle-inspection-type.enum';

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

    @PrimaryColumn({ type: 'simple-enum', enum: VehicleInspectionTypeEnum })
    InspectionType: VehicleInspectionTypeEnum;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}

export class VehiclePeriodicInspectionBuilder extends BuilderTemplate<VehiclePeriodicInspection> {
    constructor() {
        super(new VehiclePeriodicInspection());
    }

    setVehicle(
        value:
            | VehiclePeriodicInspection['Vehicle']
            | VehiclePeriodicInspection['VehicleId']
    ) {
        if (value instanceof Vehicle) this.value.Vehicle = value;
        else this.value.VehicleId = value;
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
