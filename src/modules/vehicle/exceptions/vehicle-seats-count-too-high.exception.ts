import {CustomException} from "../../../shared/shared.exception";
import {Vehicle} from "../vehicle.entity";
import {VehicleValidator} from "../vehicle.validator";

export class VehicleSeatsCountTooHighException extends CustomException<Vehicle> {
    constructor(vehicle?: Vehicle) {
        super(vehicle);
    }
    override getMessage(): string {
        return `Seats count is too high. Max is ${VehicleValidator.MAX_VEHICLE_SEATS_COUNT}`;
    }
}
