import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { BuilderTemplate } from '../../../shared/shared.types';
import { Company } from '../../company/entities/company.entity';
import { CompanyType } from '../../company/validators/company.validator';

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

    @ManyToOne(() => Company, (object) => object.Id)
    @JoinColumn({ name: 'CompanyId' })
    Company: Company;

    @Column({ type: 'uuid' })
    CompanyId: Company['Id'];
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
        if (ShortName !== undefined) this.value.ShortName = ShortName;
        return this;
    }

    setPlates(Plates: string) {
        if (Plates !== undefined) this.value.Plates = Plates;
        return this;
    }

    setSeatsCount(SeatsCount: number) {
        if (SeatsCount !== undefined) this.value.SeatsCount = SeatsCount;
        return this;
    }

    setCompany(value: Company | Company['Id']) {
        if (value instanceof Company) {
            this.value.Company = value;
            this.value.CompanyId = value.Id;
        } else {
            this.value.CompanyId = value;
        }

        return this;
    }
}
