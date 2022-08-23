import { VehicleInspectionTypeEnum } from '../enums/vehicle-inspection-type.enum';

export class VehiclePeriodicInspectionId {
    VehicleId: number;
    FromDate: Date;
    ToDate: Date;
    InspectionType: VehicleInspectionTypeEnum;
}
