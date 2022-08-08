import { Validator } from '../../../shared/shared.validator';
import { VehiclePeriodicInspection } from '../entities/vehicle-periodic-inspection.entity';

export class VehiclePeriodicInspectionValidator extends Validator<VehiclePeriodicInspection> {
    constructor(value?: VehiclePeriodicInspection) {
        super(value);
    }
}
