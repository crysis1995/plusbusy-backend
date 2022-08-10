import { Module } from '@nestjs/common';
import { DriverPreferredVehiclesService } from './driver-preferred-vehicles.service';
import { DriverPreferredVehiclesController } from './driver-preferred-vehicles.controller';

@Module({
  providers: [DriverPreferredVehiclesService],
  controllers: [DriverPreferredVehiclesController]
})
export class DriverPreferredVehiclesModule {}
