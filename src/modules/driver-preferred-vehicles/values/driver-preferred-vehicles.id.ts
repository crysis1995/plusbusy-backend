import { DriverPreferredVehicles } from '../entities/driver-preferred-vehicles.entity';

export class DriverPreferredVehiclesId {
    constructor(
        public DriverId: DriverPreferredVehicles['DriverId'],
        public VehicleId: DriverPreferredVehicles['VehicleId']
    ) {}
}
