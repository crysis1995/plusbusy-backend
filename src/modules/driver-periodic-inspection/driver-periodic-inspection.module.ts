import { Module } from "@nestjs/common";
import { DriverPeriodicInspectionService } from "./driver-periodic-inspection.service";
import { DriverPeriodicInspectionController } from "./driver-periodic-inspection.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DriverPeriodicInspection } from "./entities/driver-periodic-inspection.entity";
import { Driver } from "../driver/entities/driver.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DriverPeriodicInspection, Driver])],
    providers: [DriverPeriodicInspectionService],
    controllers: [DriverPeriodicInspectionController],
    exports: [TypeOrmModule]
})
export class DriverPeriodicInspectionModule {}
