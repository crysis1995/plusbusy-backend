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
    Request,
    UseGuards
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { CompanyGuard } from '../company/guards/company.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestData, RequestWithUserAndCompany } from '../../shared/shared.types';
import { VehicleId } from './values/vehicle-id.value';

@ApiTags('Vehicle')
@UseGuards(JwtAuthGuard, CompanyGuard)
@Controller('vehicle')
export class VehicleController {
    @Inject(VehicleService)
    private vehicleService: VehicleService;

    @Get('ping')
    index() {
        return 'Hello from vehicle controller';
    }

    @Get('/')
    async findAll(@Request() req: RequestWithUserAndCompany) {
        return await this.vehicleService.getAll(new RequestData(req));
    }

    @Get('/:id')
    async findById(@Param('id', ParseIntPipe) id: number, @Request() req: RequestWithUserAndCompany) {
        return await this.vehicleService.getByVehicle(new VehicleId(id), new RequestData(req));
    }

    @Get(':id/exist')
    async isExist(@Param('id', ParseIntPipe) id: number, @Request() req: RequestWithUserAndCompany) {
        return await this.vehicleService.exist(new VehicleId(id), new RequestData(req));
    }

    @Post()
    async create(@Body() dto: CreateVehicleDto, @Request() req: RequestWithUserAndCompany) {
        return await this.vehicleService.create(dto, new RequestData(req));
    }

    @Put(':id')
    async updateVehicle(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateVehicleDto,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.vehicleService.update(new VehicleId(id), dto, new RequestData(req));
    }

    @Delete(':id')
    async deleteVehicle(@Param('id', ParseIntPipe) id: number, @Request() req: RequestWithUserAndCompany) {
        await this.vehicleService.delete(new VehicleId(id), new RequestData(req));
    }
}
