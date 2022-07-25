import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehiclePeriodicInspectionController } from './vehicle-periodic-inspection/vehicle-periodic-inspection.controller';
import { VehiclePeriodicInspectionModule } from './vehicle-periodic-inspection/vehicle-periodic-inspection.module';
import { VehicleMileageController } from './vehicle-mileage/vehicle-mileage.controller';
import { VehicleMileageModule } from './vehicle-mileage/vehicle-mileage.module';
import { DriverController } from './driver/driver.controller';
import { DriverModule } from './driver/driver.module';
import { DriverPeriodicInspectionModule } from './driver-periodic-inspection/driver-periodic-inspection.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle/vehicle.entity';
import { VehiclePeriodicInspection } from './vehicle-periodic-inspection/vehicle-periodic-inspection.entity';
import { VehicleMileage } from './vehicle-mileage/vehicle-mileage.entity';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal:true}),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [
                // Driver,
                Vehicle,
                // DriverPeriodicInspection,
                VehiclePeriodicInspection,
                VehicleMileage
            ],
            synchronize: true
        }),
        AuthModule,
        UsersModule,
        VehicleModule,
        VehiclePeriodicInspectionModule,
        VehicleMileageModule,
        DriverModule,
        DriverPeriodicInspectionModule
    ],
    controllers: [
        AppController,
        VehiclePeriodicInspectionController,
        VehicleMileageController,
        DriverController
    ],
    providers: [AppService]
})
export class AppModule {}
