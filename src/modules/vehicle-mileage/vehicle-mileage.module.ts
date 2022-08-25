import { Module } from '@nestjs/common';
import { VehicleMileageService } from './services/vehicle-mileage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleMileage } from './entities/vehicle-mileage.entity';
import { VehicleMileageController } from './controllers/vehicle-mileage.controller';
import { VehicleService } from '../vehicle/services/vehicle.service';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { CompanyService } from '../company/services/company.service';
import { Company } from '../company/entities/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleMileage, Vehicle, Company])],
    providers: [VehicleMileageService, VehicleService, CompanyService],
    controllers: [VehicleMileageController],
    exports: [TypeOrmModule]
})
export class VehicleMileageModule {}
