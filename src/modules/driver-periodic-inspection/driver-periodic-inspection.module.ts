import { Module } from '@nestjs/common';
import { DriverPeriodicInspectionService } from './services/driver-periodic-inspection.service';
import { DriverPeriodicInspectionController } from './controllers/driver-periodic-inspection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverPeriodicInspection } from './entities/driver-periodic-inspection.entity';
import { Driver } from '../driver/entities/driver.entity';
import { Company } from '../company/entities/company.entity';
import { CompanyService } from '../company/services/company.service';
import { DriverService } from '../driver/services/driver.service';

@Module({
    imports: [TypeOrmModule.forFeature([DriverPeriodicInspection, Driver, Company])],
    providers: [DriverPeriodicInspectionService, DriverService, CompanyService],
    controllers: [DriverPeriodicInspectionController],
    exports: [TypeOrmModule]
})
export class DriverPeriodicInspectionModule {}
