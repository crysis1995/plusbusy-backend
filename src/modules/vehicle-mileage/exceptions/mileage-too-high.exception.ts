import { VehicleMileage } from "../vehicle-mileage.entity";
import { CustomException } from "../../../shared/shared.exception";
import { HttpStatus } from "@nestjs/common";

export class MileageTooHighException extends CustomException<VehicleMileage> {
    constructor(VehicleMileage: VehicleMileage) {
        super(VehicleMileage);
    }
    custom_message = `Mileage of vehicle's ID: ${this.Object.VehicleId} has too high mileage value`;
    custom_status = HttpStatus.BAD_REQUEST;
}
