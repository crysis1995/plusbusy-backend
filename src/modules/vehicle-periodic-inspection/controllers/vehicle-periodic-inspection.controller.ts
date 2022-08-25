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
import { ApiTags } from '@nestjs/swagger';
import { VehiclePeriodicInspectionService } from '../services/vehicle-periodic-inspection.service';
import { VehiclePeriodicInspectionId } from '../values/vehicle-periodic-inspection.id';
import { ParseDayjsPipe } from '../../../shared/pipes/parse-dayjs.pipe';
import { Dayjs } from 'dayjs';
import { ParseInspectionTypePipe } from '../pipes/parse-inspection-type.pipe';
import { VehicleInspectionTypeEnum } from '../enums/vehicle-inspection-type.enum';
import { RequestData, RequestWithUserAndCompany } from '../../../shared/shared.types';
import { VehicleId } from '../../vehicle/values/vehicle-id.value';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CompanyGuard } from '../../company/guards/company.guard';
import { CreateVehiclePeriodicInspectionDto } from '../dtos/create-vehicle-periodic-inspection.dto';
import { UpdateVehiclePeriodicInspectionDto } from '../dtos/update-vehicle-periodic-inspection.dto';

@ApiTags('Vehicle periodic inspection')
@UseGuards(JwtAuthGuard, CompanyGuard)
@Controller('vehicle-periodic-inspection')
export class VehiclePeriodicInspectionController {
    @Inject(VehiclePeriodicInspectionService)
    private vehiclePeriodicInspectionService: VehiclePeriodicInspectionService;

    @Get()
    async getAll(@Request() req: RequestWithUserAndCompany) {
        return await this.vehiclePeriodicInspectionService.getAll(new RequestData(req));
    }

    @Get('byVehicle/:vehicleId')
    async getByVehicle(
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.vehiclePeriodicInspectionService.getAllByVehicle(
            new VehicleId(vehicleId),
            new RequestData(req)
        );
    }

    @Get('newest/:vehicleId/:inspectionType')
    async getNewest(
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Param('inspectionType', ParseInspectionTypePipe) inspectionType: VehicleInspectionTypeEnum,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.vehiclePeriodicInspectionService.getNewest(
            new VehicleId(vehicleId),
            inspectionType,
            new RequestData(req)
        );
    }

    @Get(':vehicleId/:fromDate/:toDate/:inspectionType')
    async getById(
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Param('fromDate', ParseDayjsPipe) fromDate: Dayjs,
        @Param('toDate', ParseDayjsPipe) toDate: Dayjs,
        @Param('inspectionType', ParseInspectionTypePipe) inspectionType: VehicleInspectionTypeEnum,
        @Request() req: RequestWithUserAndCompany
    ) {
        const key = new VehiclePeriodicInspectionId(vehicleId, fromDate, toDate, inspectionType);
        return await this.vehiclePeriodicInspectionService.getById(key, new RequestData(req));
    }

    @Post()
    async create(
        @Body() dto: CreateVehiclePeriodicInspectionDto,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.vehiclePeriodicInspectionService.create(dto, new RequestData(req));
    }

    @Put(':vehicleId/:fromDate/:toDate/:inspectionType')
    async update(
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Param('fromDate', ParseDayjsPipe) fromDate: Dayjs,
        @Param('toDate', ParseDayjsPipe) toDate: Dayjs,
        @Param('inspectionType', ParseInspectionTypePipe) inspectionType: VehicleInspectionTypeEnum,
        @Request() req: RequestWithUserAndCompany,
        @Body() dto: UpdateVehiclePeriodicInspectionDto
    ) {
        const key = new VehiclePeriodicInspectionId(vehicleId, fromDate, toDate, inspectionType);
        return await this.vehiclePeriodicInspectionService.update(key, dto, new RequestData(req));
    }

    @Delete(':vehicleId/:fromDate/:toDate/:inspectionType')
    async delete(
        @Param('vehicleId', ParseIntPipe) vehicleId: number,
        @Param('fromDate', ParseDayjsPipe) fromDate: Dayjs,
        @Param('toDate', ParseDayjsPipe) toDate: Dayjs,
        @Param('inspectionType', ParseInspectionTypePipe) inspectionType: VehicleInspectionTypeEnum,
        @Request() req: RequestWithUserAndCompany
    ) {
        const key = new VehiclePeriodicInspectionId(vehicleId, fromDate, toDate, inspectionType);
        return await this.vehiclePeriodicInspectionService.delete(key, new RequestData(req));
    }
}
