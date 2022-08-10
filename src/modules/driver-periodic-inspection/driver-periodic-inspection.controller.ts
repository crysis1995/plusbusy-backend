import { Body, Controller, Delete, Get, Inject, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompanyGuard } from '../company/guards/company.guard';
import { DriverPeriodicInspectionService } from './driver-periodic-inspection.service';
import { ApiTags } from '@nestjs/swagger';
import {
    CreateDriverPeriodicInspectionDto,
    CreateDriverPeriodicInspectionDtoScheme
} from './dtos/create-driver-periodic-inspection.dto';
import { RequestData, RequestWithUserAndCompany } from '../../shared/shared.types';
import { UpdateDriverPeriodicInspectionDto } from './dtos/update-driver-periodic-inspection.dto';
import { DriverPeriodicInspectionDocumentTypeEnum } from './enums/driver-periodic-inspection-document-type.enum';
import { DriverPeriodicInspectionId } from './values/driver-periodic-inspection-id.value';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

@ApiTags('Driver periodic inspection')
@UseGuards(JwtAuthGuard, CompanyGuard)
@Controller('driver-periodic-inspection')
export class DriverPeriodicInspectionController {
    @Inject(DriverPeriodicInspectionService)
    private driverPeriodicInspectionService: DriverPeriodicInspectionService;

    @Get()
    async getInspectionById(
        @Query('DriverId') DriverId: number,
        @Query('FromDate') FromDate: Date,
        @Query('ToDate') ToDate: Date,
        @Query('DocumentType')
        DocumentType: DriverPeriodicInspectionDocumentTypeEnum,
        @Request() req: RequestWithUserAndCompany
    ) {
        const data = new RequestData(req);
        const id = new DriverPeriodicInspectionId(DriverId, FromDate, ToDate, DocumentType);
        if (DriverId && FromDate && ToDate && DocumentType)
            return await this.driverPeriodicInspectionService.getInspectionById(id, data);
        else {
            return await this.driverPeriodicInspectionService.getAllBy(id, data);
        }
    }

    @Post()
    async createInspection(
        @Body() dto: CreateDriverPeriodicInspectionDto,
        @Request() req: RequestWithUserAndCompany
    ) {
        return await this.driverPeriodicInspectionService.createInspection(dto, new RequestData(req));
    }

    @Put()
    async updateInspection(
        @Query('DriverId') DriverId: number,
        @Query('FromDate') FromDate: Date,
        @Query('ToDate') ToDate: Date,
        @Query('DocumentType')
        DocumentType: DriverPeriodicInspectionDocumentTypeEnum,
        @Body() dto: UpdateDriverPeriodicInspectionDto,
        @Request() req: RequestWithUserAndCompany
    ) {
        const id = new DriverPeriodicInspectionId(DriverId, FromDate, ToDate, DocumentType);
        return await this.driverPeriodicInspectionService.updateInspection(id, dto, new RequestData(req));
    }

    @Delete()
    async deleteInspection(
        @Query('DriverId') DriverId: number,
        @Query('FromDate') FromDate: Date,
        @Query('ToDate') ToDate: Date,
        @Query('DocumentType')
        DocumentType: DriverPeriodicInspectionDocumentTypeEnum,
        @Request() req: RequestWithUserAndCompany
    ) {
        const id = new DriverPeriodicInspectionId(DriverId, FromDate, ToDate, DocumentType);
        return await this.driverPeriodicInspectionService.deleteInspection(id, new RequestData(req));
    }
}
