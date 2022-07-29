import { CustomException } from "../../../shared/shared.exception";
import { Vehicle } from "../vehicle.entity";
import { GeneralVehicleValidator, VehicleValidator } from "../vehicle.validator";
import { HttpStatus } from "@nestjs/common";

export class VehicleSeatsCountTooLowException extends CustomException<Vehicle> {
    constructor(vehicle?: Vehicle) {
        super(vehicle);
    }

    custom_message = `Seats count is too low. Min is ${GeneralVehicleValidator.VEHICLE_SEATS_MIN_COUNT}`;
    custom_status = HttpStatus.BAD_REQUEST;
}
