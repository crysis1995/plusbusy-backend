import {VehicleMileage} from '../vehicle-mileage.entity';
import {CustomException} from "../../../shared/shared.exception";

export class MileageTooHighException extends CustomException<VehicleMileage> {
    constructor(VehicleMileage: VehicleMileage) {
        super(VehicleMileage);
    }
    override getMessage(): string {
        return `Mileage of vehicle's ID: ${this.Object.VehicleId} has too high mileage value`;
    }
}
