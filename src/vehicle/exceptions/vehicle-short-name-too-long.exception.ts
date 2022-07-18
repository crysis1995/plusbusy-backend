import { CustomException } from '../../shared.exception';
import { Vehicle } from '../vehicle.entity';
import { VehicleValidator } from '../vehicle.validator';

export class VehicleShortNameTooLongException extends CustomException<Vehicle> {
    constructor(vehicle?: Vehicle) {
        super(vehicle);
    }
    override getMessage(): string {
        return `Short name is too long. Max is ${VehicleValidator.MAX_VEHICLE_SHORT_NAME_LENGTH}`;
    }
}
