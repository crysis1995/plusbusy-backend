import { DriverPeriodicInspectionDocumentTypeEnum } from '../enums/driver-periodic-inspection-document-type.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import { Driver } from '../../driver/entities/driver.entity';
import { BuilderTemplate } from '../../../shared/shared.types';

@Entity()
export class DriverPeriodicInspection {
    @ManyToOne(() => Driver, (driver) => driver.Id)
    @JoinColumn({ name: 'DriverId' })
    Driver: Driver;

    @PrimaryColumn()
    DriverId: number;

    @PrimaryColumn('date')
    FromDate: Date | string;

    @PrimaryColumn('date')
    ToDate: Date | string;

    @PrimaryColumn({
        type: 'simple-enum',
        enum: DriverPeriodicInspectionDocumentTypeEnum
    })
    DocumentType: DriverPeriodicInspectionDocumentTypeEnum;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @Column('text', { nullable: true })
    Note;
}

export class DriverPeriodicInspectionBuilder extends BuilderTemplate<DriverPeriodicInspection> {
    constructor() {
        super(new DriverPeriodicInspection());
    }
    setDriver(value: DriverPeriodicInspection['Driver'] | DriverPeriodicInspection['DriverId']) {
        if (value instanceof Driver) this.value.Driver = value;
        else this.value.DriverId = value;
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

    setNote(value: DriverPeriodicInspection['Note']) {
        this.value.Note = value;
        return this;
    }
}
