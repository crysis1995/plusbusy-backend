import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicle, Company])],
    providers: [VehicleService, CompanyService],
    controllers: [VehicleController],
    exports: [VehicleService, TypeOrmModule]
})
export class VehicleModule {}
