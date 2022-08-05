import { HttpStatus } from "@nestjs/common";
import { CustomException } from "../../../shared/shared.exception";
import { Vehicle } from "../entities/vehicle.entity";

export class VehicleNotFoundException extends CustomException<Vehicle> {
    constructor(vehicle) {
        super(vehicle);
    }
    custom_message = `Cannot found vehicle with ID: ${this.Object?.Id}`;
    custom_status = HttpStatus.NOT_FOUND;
}
