import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class VehicleMileage {
    @PrimaryColumn()
    @OneToMany((type) => Vehicle, (vehicle) => vehicle.Id)
    VehicleId: number;

    @Column()
    MileageKm: number;

    @PrimaryColumn()
    Date: Date;
}

export class VehicleMileageBuilder {
    constructor() {
        this.value = new VehicleMileage();
    }

    private readonly value: VehicleMileage;

    setVehicleId(value: VehicleMileage['VehicleId']) {
        this.value.VehicleId = value;
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

    build(): VehicleMileage {
        return this.value;
    }
}
