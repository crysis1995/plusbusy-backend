import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { Company } from '../company/entities/company.entity';
import { CompanyService } from '../company/company.service';

@Module({
    imports: [TypeOrmModule.forFeature([Driver, Company])],
    providers: [DriverService, CompanyService],
    exports: [TypeOrmModule, DriverService],
    controllers: [DriverController]
})
export class DriverModule {}
