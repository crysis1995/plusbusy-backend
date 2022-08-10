import { Module } from '@nestjs/common';
import { VehicleMileageService } from './vehicle-mileage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleMileage } from './entities/vehicle-mileage.entity';
import { VehicleMileageController } from './vehicle-mileage.controller';
import { VehicleService } from '../vehicle/vehicle.service';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleMileage, Vehicle, Company])],
    providers: [VehicleMileageService, VehicleService, CompanyService],
    controllers: [VehicleMileageController],
    exports: [TypeOrmModule]
})
export class VehicleMileageModule {}
