import { DriverPeriodicInspectionDocumentTypeEnum } from './DriverPeriodicInspectionDocumentType.enum';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Driver } from '../driver/driver.entity';
import { BuilderTemplate } from '../../shared/shared.types';

@Entity()
export class DriverPeriodicInspection {
    @ManyToOne(() => Driver, (driver) => driver.Id)
    @JoinColumn({ name: 'DriverId' })
    Driver: Driver;

    @PrimaryColumn()
    DriverId: number;

    @PrimaryColumn()
    FromDate: Date;

    @PrimaryColumn()
    ToDate: Date;

    @Column({ type: 'enum', enum: DriverPeriodicInspectionDocumentTypeEnum, primary: true })
    DocumentType: DriverPeriodicInspectionDocumentTypeEnum;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}

export class DriverPeriodicInspectionBuilder extends BuilderTemplate<DriverPeriodicInspection> {
    constructor() {
        super(new DriverPeriodicInspection());
    }
    setDriver(value: DriverPeriodicInspection['Driver']) {
        this.value.Driver = value;
        return this;
    }
    setFromDate(value: DriverPeriodicInspection['FromDate']) {
        this.value.FromDate = value;
        return this;
    }
    setToDate(value: DriverPeriodicInspection['ToDate']) {
        this.value.ToDate = value;
        return this;
    }
    setDocumentType(value: DriverPeriodicInspection['DocumentType']) {
        this.value.DocumentType = value;
        return this;
    }
}
