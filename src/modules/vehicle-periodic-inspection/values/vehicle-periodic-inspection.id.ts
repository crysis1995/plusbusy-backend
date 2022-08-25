import { VehicleInspectionTypeEnum } from '../enums/vehicle-inspection-type.enum';
import dayjs from 'dayjs';

export class VehiclePeriodicInspectionId {
    constructor(
        public VehicleId: number,
        public FromDate: dayjs.Dayjs,
        public ToDate: dayjs.Dayjs,
        public InspectionType: VehicleInspectionTypeEnum
    ) {}
}
