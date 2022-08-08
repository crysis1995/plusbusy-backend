import { DriverPeriodicInspectionDocumentTypeEnum } from '../enums/driver-periodic-inspection-document-type.enum';

export class DriverPeriodicInspectionId {
    constructor(
        public DriverId: number,
        public FromDate: Date,
        public ToDate: Date,
        public DocumentType: DriverPeriodicInspectionDocumentTypeEnum
    ) {}
}
