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
import { DriverService } from './driver.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestData, RequestWithUserAndCompany } from '../../shared/shared.types';
import { CompanyGuard } from '../company/guards/company.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateDriverDto } from './dtos/create-driver.dto';
import { UpdateDriverDto } from './dtos/update-driver.dto';
import { DriverId } from './values/driver-id.value';

@ApiTags('Driver')
@UseGuards(JwtAuthGuard, CompanyGuard)
@Controller('driver')
export class DriverController {
    @Inject(DriverService)
    private driverService: DriverService;

    @Get()
    async getAll(@Request() req: RequestWithUserAndCompany) {
        return this.driverService.getAll(new RequestData(req));
    }

    @Get(':id')
    async getDriverById(@Param('id', ParseIntPipe) id, @Request() req: RequestWithUserAndCompany) {
        return this.driverService.getById(new DriverId(id), new RequestData(req));
    }

    @Post()
    async createDriver(@Body() dto: CreateDriverDto, @Request() req: RequestWithUserAndCompany) {
        return this.driverService.createDriver(dto, new RequestData(req));
    }

    @Put(':id')
    async updateDriver(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateDriverDto,
        @Request() req: RequestWithUserAndCompany
    ) {
        return this.driverService.updateDriver(new DriverId(id), dto, new RequestData(req));
    }

    @Delete(':id')
    async deleteDriver(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: RequestWithUserAndCompany
    ) {
        await this.driverService.deleteDriver(new DriverId(id), new RequestData(req));
    }
}
