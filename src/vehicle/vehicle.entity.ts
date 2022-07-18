import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { BuilderTemplate } from '../shared.types';
import {Injectable} from "@nestjs/common";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    ShortName: string;

    @Column()
    Plates: string;

    @Column()
    SeatsCount: number;
}

export class VehicleBuilder extends BuilderTemplate<Vehicle> {
    constructor() {
        super(new Vehicle());
    }

    setId(Id: number) {
        this.value.Id = Id;
        return this;
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
