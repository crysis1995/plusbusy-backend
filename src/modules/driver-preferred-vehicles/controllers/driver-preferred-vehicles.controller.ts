import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request
} from '@nestjs/common';
import { PreferredTypeEnum } from '../enums/preferred-type.enum';
import { PreferredTypeEnumValuePipe } from '../pipes/preferred-type-enum-value.pipe';
import { DriverPreferredVehiclesService } from '../services/driver-preferred-vehicles.service';
import { RequestData, RequestWithUserAndCompany } from '../../../shared/shared.types';
import { VehicleId } from '../../vehicle/values/vehicle-id.value';
import { DriverId } from '../../driver/values/driver-id.value';
import { CreateDriverPreferredVehiclesDto } from '../dtos/create-driver-preferred-vehicles.dto';
import { UpdateDriverPreferredVehiclesDto } from '../dtos/update-driver-preferred-vehicles.dto';
import { DriverPreferredVehiclesId } from '../values/driver-preferred-vehicles.id';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Driver Preferred Vehicles")
@Controller('driver-preferred-vehicles')
export class DriverPreferredVehiclesController {
    @Inject(DriverPreferredVehiclesService)
    private driverPreferredVehiclesService: DriverPreferredVehiclesService;

    @Get('all/:byType/:id')
    async getPreferredData(
        @Param('byType', PreferredTypeEnumValuePipe)
        type: PreferredTypeEnum,
        @Param('id', ParseIntPipe) id: number,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.driverPreferredVehiclesService.getAllByType(
            id,
            type,
            new RequestData(req)
        );
    }

    @Get(':driverId/:vehicleId')
    async getById(
        @Param('driverId', ParseIntPipe) driverId: number,
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.driverPreferredVehiclesService.getById(
            new DriverPreferredVehiclesId(driverId, vehicleId),
            new RequestData(req)
        );
    }

    @Post()
    async create(
        @Body() dto: CreateDriverPreferredVehiclesDto,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.driverPreferredVehiclesService.create(dto, new RequestData(req));
    }

    @Put(':driverId/:vehicleId')
    async update(
        @Param('driverId', ParseIntPipe) driverId: number,
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Body() dto: UpdateDriverPreferredVehiclesDto,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.driverPreferredVehiclesService.update(
            new DriverPreferredVehiclesId(driverId, vehicleId),
            dto,
            new RequestData(req)
        );
    }

    @Delete(':driverId/:vehicleId')
    async delete(
        @Param('driverId', ParseIntPipe) driverId: number,
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.driverPreferredVehiclesService.delete(
            new DriverPreferredVehiclesId(driverId, vehicleId),
            new RequestData(req)
        );
    }
}
