import { Controller, Get, Param } from '@nestjs/common';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
    constructor(private vehicleService: VehicleService) {}

    @Get()
    async findAll() {
        return await this.vehicleService.getAllVehicles();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.vehicleService.getVehicleByVehicleId(id);
    }

    @Get(':id/exist')
    async isExist(@Param('id') id: number) {
        return await this.vehicleService.exist(id);
    }
}
