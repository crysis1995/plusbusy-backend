import { VehicleMileage } from '../entities/vehicle-mileage.entity';

export class VehicleMileageId {
    constructor(
        public VehicleId: VehicleMileage['VehicleId'],
        public MileageKm: VehicleMileage['MileageKm'],
        public Date: VehicleMileage['Date']
    ) {}
}
