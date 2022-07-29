import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../../modules/vehicle/vehicle.entity';
import { VehicleMileage } from '../../modules/vehicle-mileage/vehicle-mileage.entity';
import { VehiclePeriodicInspection } from '../../modules/vehicle-periodic-inspection/vehicle-periodic-inspection.entity';
import { Driver } from '../../modules/driver/driver.entity';
import { DriverPeriodicInspection } from '../../modules/driver-periodic-inspection/driver-periodic-inspection.entity';
import { Company } from '../../modules/company/company.entity';
import { Users } from '../../modules/users/users.entity';

@Module({
    providers: [SeederService],
    imports: [
        TypeOrmModule.forFeature([
            Vehicle,
            VehicleMileage,
            VehiclePeriodicInspection,
            Driver,
            DriverPeriodicInspection,
            Company,
            Users
        ])
    ]
})
export class SeederModule {}
