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
import { BasicCompanyDto } from '../company/dtos/BasicCompanyDto';
import { BasicUserDto } from '../users/dtos/basic-user.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

type WithUser = { user: BasicUserDto };
type WithCompany = { company: BasicCompanyDto };
type RequestWithUserAndCompany = Request & WithUser & WithCompany;

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
        return await this.vehicleService.getAllVehicles(req.company);
    }

    @Get('/:id')
    async findById(@Param('id', ParseIntPipe) id: number, @Request() req: RequestWithUserAndCompany) {
        return await this.vehicleService.getVehicleByVehicleId(id, req.company);
    }

    @Get(':id/exist')
    async isExist(@Param('id', ParseIntPipe) id: number, @Request() req: RequestWithUserAndCompany) {
        return await this.vehicleService.exist(id, req.company);
    }

    @Post()
    async create(@Body() dto: CreateVehicleDto, @Request() req: RequestWithUserAndCompany) {
        return await this.vehicleService.createVehicle(dto, req.company);
    }

    @Put(':id')
    async updateVehicle(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVehicleDto) {
        return await this.vehicleService.updateVehicle(id, dto);
    }

    @Delete(':id')
    async deleteVehicle(@Param('id', ParseIntPipe) id: number) {
        await this.vehicleService.deleteVehicle(id);
    }
}
