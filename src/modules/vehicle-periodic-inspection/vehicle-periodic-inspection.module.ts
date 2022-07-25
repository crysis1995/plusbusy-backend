import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclePeriodicInspection } from './vehicle-periodic-inspection.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { VehiclePeriodicInspectionService } from './vehicle-periodic-inspection.service';
import { VehiclePeriodicInspectionController } from './vehicle-periodic-inspection.controller';
import { VehicleService } from '../vehicle/vehicle.service';

@Module({
    imports: [TypeOrmModule.forFeature([VehiclePeriodicInspection, Vehicle])],
    providers: [VehiclePeriodicInspectionService, VehicleService],
    controllers: [VehiclePeriodicInspectionController],
    exports:[TypeOrmModule]
})
export class VehiclePeriodicInspectionModule {}
