import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { VehiclePeriodicInspectionModule } from './modules/vehicle-periodic-inspection/vehicle-periodic-inspection.module';
import { VehicleMileageModule } from './modules/vehicle-mileage/vehicle-mileage.module';
import { DriverModule } from './modules/driver/driver.module';
import { DriverPeriodicInspectionModule } from './modules/driver-periodic-inspection/driver-periodic-inspection.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederModule } from './common/seeder/seeder.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmService } from './shared/type-orm.service';
import { CompanyModule } from './modules/company/company.module';
import { DriverPreferredVehiclesModule } from './modules/driver-preferred-vehicles/driver-preferred-vehicles.module';

const envFilePath = getEnvPath(`${__dirname}/common/envs`);

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath, isGlobal: true }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
        SeederModule,
        AuthModule,
        CompanyModule,
        DriverModule,
        DriverPeriodicInspectionModule,
        UsersModule,
        VehicleMileageModule,
        VehicleModule,
        VehiclePeriodicInspectionModule,
        DriverPreferredVehiclesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
