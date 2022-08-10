import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclePeriodicInspection } from './entities/vehicle-periodic-inspection.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { VehiclePeriodicInspectionService } from './vehicle-periodic-inspection.service';
import { VehiclePeriodicInspectionController } from './vehicle-periodic-inspection.controller';
import { VehicleService } from '../vehicle/vehicle.service';
import { Company } from '../company/entities/company.entity';
import { CompanyService } from '../company/company.service';

@Module({
    imports: [TypeOrmModule.forFeature([VehiclePeriodicInspection, Vehicle, Company])],
    providers: [VehiclePeriodicInspectionService, VehicleService, CompanyService],
    controllers: [VehiclePeriodicInspectionController],
    exports: [TypeOrmModule]
})
export class VehiclePeriodicInspectionModule {}
