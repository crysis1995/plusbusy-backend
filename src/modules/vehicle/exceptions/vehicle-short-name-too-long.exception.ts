import { CustomException } from '../../../shared/shared.exception';
import { Vehicle } from '../entities/vehicle.entity';
import { HttpStatus } from '@nestjs/common';
import { VEHICLE_SHORT_NAME_MAX_LENGTH } from '../schemas/short-name.schema';

export class VehicleShortNameTooLongException extends CustomException<Vehicle> {
    constructor(vehicle?: Vehicle) {
        super(vehicle);
    }
    custom_status = HttpStatus.BAD_REQUEST;
    custom_message = `Short name is too long. Max is ${VEHICLE_SHORT_NAME_MAX_LENGTH}`;
}
