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
import { DriverService } from '../services/driver.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestData, RequestWithUserAndCompany } from '../../../shared/shared.types';
import { CompanyGuard } from '../../company/guards/company.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateDriverDto } from '../dtos/create-driver.dto';
import { UpdateDriverDto } from '../dtos/update-driver.dto';
import { DriverId } from '../values/driver-id.value';
import { Driver } from '../entities/driver.entity';

@ApiTags('Driver')
// @UseGuards(JwtAuthGuard, CompanyGuard)
@Controller('driver')
export class DriverController {
    @Inject(DriverService)
    private driverService: DriverService;

    @ApiOkResponse({ type: Driver, isArray: true })
    @Get()
    async getAll(@Request() req: RequestWithUserAndCompany) {
        // TODO add query params to filter/sort drivers
        return this.driverService.getAll(new RequestData(req));
    }

    @Get(':id')
    async getDriverById(@Param('id', ParseIntPipe) id, @Request() req: RequestWithUserAndCompany) {
        return this.driverService.getById(new DriverId(id), new RequestData(req));
    }

    @Post()
    async createDriver(@Body() dto: CreateDriverDto, @Request() req: RequestWithUserAndCompany) {
        return this.driverService.create(dto, new RequestData(req));
    }

    @Put(':id')
    async updateDriver(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateDriverDto,
        @Request() req: RequestWithUserAndCompany
    ) {
        return this.driverService.update(new DriverId(id), dto, new RequestData(req));
    }

    @Delete(':id')
    async deleteDriver(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: RequestWithUserAndCompany
    ) {
        await this.driverService.delete(new DriverId(id), new RequestData(req));
    }
}
