import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicle mileage')
@Controller('vehicle-mileage')
export class VehicleMileageController {}
