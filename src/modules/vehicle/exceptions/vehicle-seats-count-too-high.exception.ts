import { CustomException } from '../../../shared/shared.exception';
import { Vehicle } from '../entities/vehicle.entity';
import { HttpStatus } from '@nestjs/common';
import { VEHICLE_SEATS_MAX_COUNT } from '../schemas/seats-count.schema';

export class VehicleSeatsCountTooHighException extends CustomException<Vehicle> {
    constructor(vehicle?: Vehicle) {
        super(vehicle);
    }
    custom_status = HttpStatus.BAD_REQUEST;
    custom_message = `Seats count is too high. Max is ${VEHICLE_SEATS_MAX_COUNT}`;
}
