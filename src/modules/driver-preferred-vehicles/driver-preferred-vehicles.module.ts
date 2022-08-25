import { Module } from '@nestjs/common';
import { DriverPreferredVehiclesService } from './services/driver-preferred-vehicles.service';
import { DriverPreferredVehiclesController } from './controllers/driver-preferred-vehicles.controller';
import { DriverService } from '../driver/services/driver.service';
import { VehicleService } from '../vehicle/services/vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverPreferredVehicles } from './entities/driver-preferred-vehicles.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Company } from '../company/entities/company.entity';
import { CompanyService } from '../company/services/company.service';

@Module({
    imports: [TypeOrmModule.forFeature([DriverPreferredVehicles, Driver, Vehicle, Company])],
    providers: [DriverPreferredVehiclesService, DriverService, VehicleService, CompanyService],
    controllers: [DriverPreferredVehiclesController]
})
export class DriverPreferredVehiclesModule {}
