import { HttpStatus } from '@nestjs/common';
import { CustomException } from '../../../shared/shared.exception';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleId } from '../values/vehicle-id.value';

export class VehicleNotFoundException extends CustomException<VehicleId> {
    constructor(vehicle) {
        super(vehicle);
    }
    custom_message = `Cannot found vehicle with ID: ${this.Object?.value}`;
    custom_status = HttpStatus.NOT_FOUND;
}
