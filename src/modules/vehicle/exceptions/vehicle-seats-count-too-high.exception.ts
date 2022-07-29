import { CustomException } from "../../../shared/shared.exception";
import { Vehicle } from "../vehicle.entity";
import { GeneralVehicleValidator, VehicleValidator } from "../vehicle.validator";
import { HttpStatus } from "@nestjs/common";

export class VehicleSeatsCountTooHighException extends CustomException<Vehicle> {
    constructor(vehicle?: Vehicle) {
        super(vehicle);
    }
    custom_status = HttpStatus.BAD_REQUEST;
    custom_message = `Seats count is too high. Max is ${GeneralVehicleValidator.VEHICLE_SEATS_MAX_COUNT}`;
}
