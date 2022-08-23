import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseFloatPipe,
    ParseIntPipe,
    Post,
    Request
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VehicleMileageId } from './values/vehicle-mileage.id';
import { ParseDatePipe } from '../../shared/pipes/parse-date.pipe';
import { VehicleMileageService } from './vehicle-mileage.service';
import { RequestData, RequestWithUserAndCompany } from '../../shared/shared.types';
import { VehicleId } from '../vehicle/values/vehicle-id.value';
import { CreateVehicleMileageDto } from './dtos/create-vehicle-mileage.dto';

@ApiTags('Vehicle mileage')
@Controller('vehicle-mileage')
export class VehicleMileageController {
    @Inject(VehicleMileageService)
    private vehicleMileageService: VehicleMileageService;

    @Get('ping')
    ping() {
        return 'Hello from Vehicle mileage module';
    }

    @Get('newest/:vehicleId')
    async getNewest(@Param('vehicleId', ParseIntPipe) vehicleId: number) {
        return await this.vehicleMileageService.getNewest(new VehicleId(vehicleId));
    }
    @Get('byVehicle/:vehicleId')
    async getAllByVehicle(@Param('vehicleId', ParseIntPipe) vehicleId: number) {
        return await this.vehicleMileageService.getAll(new VehicleId(vehicleId));
    }

    @Get(':vehicleId/:mileageKm/:date')
    async getById(
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Param('mileageKm', ParseFloatPipe) mileageKm: number,
        @Param('date', ParseDatePipe) date: Date,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.vehicleMileageService.getById(
            new VehicleMileageId(vehicleId, mileageKm, date),
            new RequestData(req)
        );
    }

    @Post()
    async setMileage(@Body() dto: CreateVehicleMileageDto, @Request() req: RequestWithUserAndCompany) {
        return await this.vehicleMileageService.save(dto, new RequestData(req));
    }

    @Delete(':vehicleId/:mileageKm/:date')
    async deleteMileage(
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Param('mileageKm', ParseFloatPipe) mileageKm: number,
        @Param('date', ParseDatePipe) date: Date,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.vehicleMileageService.delete( new VehicleMileageId(vehicleId, mileageKm, date),
            new RequestData(req))
    }
}
