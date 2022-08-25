import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CompanySettings {
    @PrimaryColumn('uuid')
    CompanyId: string;

    @PrimaryColumn('varchar')
    Version: string;

    @Column('timestamp with time zone')
    DefaultTimeOffsetBeforeNotification;
}
