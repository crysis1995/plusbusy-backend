import { Module } from '@nestjs/common';
import { DriverPreferredVehiclesService } from './driver-preferred-vehicles.service';
import { DriverPreferredVehiclesController } from './driver-preferred-vehicles.controller';
import { DriverService } from '../driver/driver.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverPreferredVehicles } from './entities/driver-preferred-vehicles.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Company } from '../company/entities/company.entity';
import { CompanyService } from '../company/company.service';

@Module({
    imports: [TypeOrmModule.forFeature([DriverPreferredVehicles, Driver, Vehicle, Company])],
    providers: [DriverPreferredVehiclesService, DriverService, VehicleService, CompanyService],
    controllers: [DriverPreferredVehiclesController]
})
export class DriverPreferredVehiclesModule {}
