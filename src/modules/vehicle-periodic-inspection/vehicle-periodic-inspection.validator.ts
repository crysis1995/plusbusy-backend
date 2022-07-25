import { Validator } from '../../shared/shared.validator';
import { VehiclePeriodicInspection } from './vehicle-periodic-inspection.entity';

export class VehiclePeriodicInspectionValidator extends Validator<VehiclePeriodicInspection> {
    constructor(value?: VehiclePeriodicInspection, throwError: boolean = true) {
        super(value, throwError);
    }

    validate
}
