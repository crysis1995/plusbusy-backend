import { CustomException } from "../../../shared/shared.exception";
import { Vehicle } from "../vehicle.entity";
import { GeneralVehicleValidator, VehicleValidator } from "../vehicle.validator";
import { HttpStatus } from "@nestjs/common";

export class VehicleShortNameTooShortException extends CustomException<Vehicle> {
    constructor(vehicle?: Vehicle) {
        super(vehicle);
    }
    custom_status = HttpStatus.BAD_REQUEST;
    custom_message = `Short name is too short. Min is ${GeneralVehicleValidator.VEHICLE_SHORT_NAME_MIN_LENGTH}`;
}
