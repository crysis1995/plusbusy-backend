import { DriverPeriodicInspection } from '../entities/driver-periodic-inspection.entity';
import { DriverPeriodicInspectionId } from '../values/driver-periodic-inspection-id.value';
import dayjs from 'dayjs';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

export class FindDriverPeriodicInspectionOptionsBuilder {
    private where: FindOptionsWhere<DriverPeriodicInspection> = {};

    setDriverId(value: DriverPeriodicInspectionId) {
        if (value.DriverId) {
            this.where = {
                ...this.where,
                DriverId: value.DriverId
            };
        }
        return this;
    }

    setDocumentType(value: DriverPeriodicInspectionId) {
        if (value.DocumentType) {
            this.where = {
                ...this.where,
                DocumentType: value.DocumentType
            };
        }
        return this;
    }

    setFromDate(value: DriverPeriodicInspectionId) {
        let FromDate = value.FromDate ? dayjs(value.FromDate) : null;
        if (FromDate) {
            this.where = {
                ...this.where,
                FromDate: FromDate.toDate().toDateString()
            };
        }
        return this;
    }

    setToDate(value: DriverPeriodicInspectionId) {
        let toDate = value.ToDate ? dayjs(value.ToDate) : null;
        if (toDate) {
            this.where = {
                ...this.where,
                ToDate: toDate.toDate().toDateString()
            };
        }
        return this;
    }

    build() {
        return this.where;
    }
}
