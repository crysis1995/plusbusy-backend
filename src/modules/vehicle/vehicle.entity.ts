import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BuilderTemplate } from "../../shared/shared.types";
import { VehicleValidator } from "./vehicle.validator";

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

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}

export class VehicleBuilder extends BuilderTemplate<Vehicle> {
    private validator: VehicleValidator;
    constructor() {
        super(new Vehicle());
        this.validator = new VehicleValidator(this.value);
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

    override build(): Vehicle {
        this.validator.validate();
        return super.build();
    }
}
