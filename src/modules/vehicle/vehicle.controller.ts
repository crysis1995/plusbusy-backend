import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
    @Inject(VehicleService)
    private vehicleService: VehicleService;

    @Get('index')
    index() {

        return 'Hello from vehicle controller';
    }

    @Get('/')
    async findAll() {
        return await this.vehicleService.getAllVehicles();
    }

    @Get('/:id')
    async findById(@Param('id') id: number) {
        return await this.vehicleService.getVehicleByVehicleId(id);
    }

    @Get(':id/exist')
    async isExist(@Param('id') id: number) {
        return await this.vehicleService.exist(id);
    }

    @Post()
    async create(@Body() dto: CreateVehicleDto) {
        return await this.vehicleService.createVehicle(dto);
    }
}
