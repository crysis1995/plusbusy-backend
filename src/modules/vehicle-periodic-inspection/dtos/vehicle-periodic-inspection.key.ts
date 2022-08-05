import { VehicleInspectionTypeEnum } from '../enums/vehicle-inspection-type.enum';

export class VehiclePeriodicInspectionKey {
    VehicleId: number;
    FromDate: Date;
    ToDate: Date;
    InspectionType: VehicleInspectionTypeEnum;
}
