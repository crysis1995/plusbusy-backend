import { CustomException } from '../../../shared/shared.exception';
import { Vehicle } from '../entities/vehicle.entity';
import { HttpStatus } from '@nestjs/common';
import { VEHICLE_SEATS_MIN_COUNT } from '../schemas/seats-count.schema';

export class VehicleSeatsCountTooLowException extends CustomException<Vehicle> {
    constructor(vehicle?: Vehicle) {
        super(vehicle);
    }

    custom_message = `Seats count is too low. Min is ${VEHICLE_SEATS_MIN_COUNT}`;
    custom_status = HttpStatus.BAD_REQUEST;
}
