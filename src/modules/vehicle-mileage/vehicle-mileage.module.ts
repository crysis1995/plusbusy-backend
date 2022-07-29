import { Module } from "@nestjs/common";
import { VehicleMileageService } from "./vehicle-mileage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VehicleMileage } from "./vehicle-mileage.entity";
import { VehicleMileageController } from "./vehicle-mileage.controller";
import { VehicleService } from "../vehicle/vehicle.service";
import { Vehicle } from "../vehicle/vehicle.entity";

@Module({
    imports: [TypeOrmModule.forFeature([VehicleMileage, Vehicle])],
    providers: [VehicleMileageService, VehicleService],
    controllers: [VehicleMileageController],
    exports: [TypeOrmModule]
})
export class VehicleMileageModule {}
