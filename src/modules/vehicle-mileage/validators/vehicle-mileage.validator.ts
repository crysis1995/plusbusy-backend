import { Validator } from '../../../shared/shared.validator';
import { VehicleMileage } from '../entities/vehicle-mileage.entity';
import { ThrowException } from '../../../shared/shared.exception';
import { MileageTooHighException } from '../exceptions/mileage-too-high.exception';

export class VehicleMileageValidator extends Validator<VehicleMileage> {
    constructor(value: VehicleMileage) {
        super(value);
    }

    @ThrowException(MileageTooHighException)
    validateMileage(MileageKm: VehicleMileage['MileageKm']) {
        return this.value.MileageKm < MileageKm;
    }
}
