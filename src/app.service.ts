import { Injectable } from '@nestjs/common';
import { Vehicle, VehicleBuilder } from './vehicle/vehicle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>
    ) {}
    async databaseInit() {
        const vehicle1 = new VehicleBuilder()
            .setId(1)
            .setShortName('Zielona strzała')
            .setPlates('TKI30KU')
            .setSeatsCount(5)
            .build();

        await this.vehicleRepository.upsert(vehicle1, {
            skipUpdateIfNoValuesChanged: true,
            conflictPaths: []
        });
    }
}
