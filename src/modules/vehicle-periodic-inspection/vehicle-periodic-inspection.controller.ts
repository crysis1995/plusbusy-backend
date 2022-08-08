import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicle periodic inspection')
@Controller('vehicle-periodic-inspection')
export class VehiclePeriodicInspectionController {}
