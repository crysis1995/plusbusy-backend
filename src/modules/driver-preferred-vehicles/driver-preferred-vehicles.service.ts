import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DriverId } from '../driver/values/driver-id.value';
import { VehicleId } from '../vehicle/values/vehicle-id.value';
import { RequestData } from '../../shared/shared.types';
import { PreferredTypeEnum } from './enums/preferred-type.enum';
import { DriverService } from '../driver/driver.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverPreferredVehicles } from './entities/driver-preferred-vehicles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverPreferredVehiclesService {
    @Inject(DriverService)
    private driverService: DriverService;

    @Inject(VehicleService)
    private vehicleService: VehicleService;

    @InjectRepository(DriverPreferredVehicles)
    private driverPreferredVehiclesRepository: Repository<DriverPreferredVehicles>;

    async getAllByType(id: number, type: PreferredTypeEnum, data: RequestData) {
        if (!type || !id) throw new BadRequestException('Type and Id must be filled.');
    }

    async getById(DriverId: DriverId, VehicleId: VehicleId, data: RequestData) {}


}
