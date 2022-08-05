import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../../modules/vehicle/entities/vehicle.entity';
import { VehicleMileage } from '../../modules/vehicle-mileage/entities/vehicle-mileage.entity';
import { VehiclePeriodicInspection } from '../../modules/vehicle-periodic-inspection/entities/vehicle-periodic-inspection.entity';
import { Driver } from '../../modules/driver/entities/driver.entity';
import { DriverPeriodicInspection } from '../../modules/driver-periodic-inspection/entities/driver-periodic-inspection.entity';
import { Company } from '../../modules/company/entities/company.entity';
import { Users } from '../../modules/users/entities/users.entity';

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
