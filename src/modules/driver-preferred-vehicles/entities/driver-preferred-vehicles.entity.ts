import { Driver } from 'src/modules/driver/entities/driver.entity';
import { Vehicle } from 'src/modules/vehicle/entities/vehicle.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import { BuilderTemplate } from '../../../shared/shared.types';

@Entity()
export class DriverPreferredVehicles {
    @ManyToOne(() => Driver, (driver) => driver.Id)
    @JoinColumn({ name: 'DriverId' })
    Driver: Driver;

    @PrimaryColumn()
    DriverId: number;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.Id)
    @JoinColumn({ name: 'VehicleId' })
    Vehicle: Vehicle;

    @PrimaryColumn()
    VehicleId: number;

    @Column('text', { nullable: true })
    Note: string;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}

export class DriverPreferredVehiclesBuilder extends BuilderTemplate<DriverPreferredVehicles> {
    constructor() {
        super(new DriverPreferredVehicles());
    }
    setDriverId(value: DriverPreferredVehicles['DriverId']) {
        this.value.DriverId = value;
        return this;
    }
    setVehicleId(value: DriverPreferredVehicles['VehicleId']) {
        this.value.VehicleId = value;
        return this;
    }
    setNote(value: DriverPreferredVehicles['Note']) {
        this.value.Note = value;
        return this;
    }
}
