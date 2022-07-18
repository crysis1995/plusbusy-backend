import {DriverPeriodicInspectionDocumentTypeEnum} from "./DriverPeriodicInspectionDocumentType.enum";
import {BaseEntity, Column, Entity} from "typeorm";

@Entity()
export class DriverPeriodicInspection extends BaseEntity{

    DriverId:number;

    @Column()
    FromDate:Date;

    @Column()
    ToDate:Date;

    @Column({type:"enum",enum:DriverPeriodicInspectionDocumentTypeEnum})
    DocumentType:DriverPeriodicInspectionDocumentTypeEnum
}