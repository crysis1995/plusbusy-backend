import { CustomException } from '../../shared.exception';
import { Vehicle } from '../vehicle.entity';
import { VehicleValidator } from '../vehicle.validator';

export class VehicleSeatsCountTooLowException extends CustomException<Vehicle> {
    constructor(vehicle?: Vehicle) {
        super(vehicle);
    }
    override getMessage(): string {
        return `Seats count is too low. Min is ${VehicleValidator.MIN_VEHICLE_SEATS_COUNT}`;
    }
}
