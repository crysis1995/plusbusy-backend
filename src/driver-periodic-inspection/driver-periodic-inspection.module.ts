import { Module } from '@nestjs/common';
import { DriverPeriodicInspectionService } from './driver-periodic-inspection.service';
import { DriverPeriodicInspectionController } from './driver-periodic-inspection.controller';

@Module({
  providers: [DriverPeriodicInspectionService],
  controllers: [DriverPeriodicInspectionController]
})
export class DriverPeriodicInspectionModule {}
