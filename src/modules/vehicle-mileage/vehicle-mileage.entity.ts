import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';
import { BuilderTemplate } from '../../shared/shared.types';

@Entity()
export class VehicleMileage {
    @ManyToOne(() => Vehicle, (vehicle) => vehicle.Id)
    @JoinColumn({ name: 'VehicleId' })
    Vehicle: Vehicle;

    @PrimaryColumn()
    VehicleId: number;

    @Column()
    MileageKm: number;

    @PrimaryColumn()
    Date: Date;
}

export class VehicleMileageBuilder extends BuilderTemplate<VehicleMileage> {
    constructor() {
        super(new VehicleMileage());
    }

    setVehicle(value: VehicleMileage['Vehicle']) {
        this.value.Vehicle = value;
        return this;
    }

    setMileageKm(value: VehicleMileage['MileageKm']) {
        this.value.MileageKm = value;
        return this;
    }

    setDate(value?: VehicleMileage['Date']) {
        this.value.Date = value || new Date();
        return this;
    }
}
