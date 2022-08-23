import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { DriverPreferredVehicles } from '../entities/driver-preferred-vehicles.entity';

export class FindDriverPreferredVehiclesOptionsBuilder {
    private where: FindOptionsWhere<DriverPreferredVehicles> = {};

    setDriverId(id: DriverPreferredVehicles['DriverId']) {
        if (id) {
            this.where = {
                ...this.where,
                DriverId: id
            };
        }
        return this;
    }
    setVehicleId(id: DriverPreferredVehicles['VehicleId']) {
        if (id) {
            this.where = {
                ...this.where,
                VehicleId: id
            };
        }
        return this;
    }

    build() {
        return this.where;
    }
}
