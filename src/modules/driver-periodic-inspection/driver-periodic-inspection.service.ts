import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DriverPeriodicInspection,
    DriverPeriodicInspectionBuilder
} from './entities/driver-periodic-inspection.entity';
import { Repository } from 'typeorm';
import { DriverPeriodicInspectionId } from './values/driver-periodic-inspection-id.value';
import { RequestData } from '../../shared/shared.types';
import dayjs from 'dayjs';
import { CreateDriverPeriodicInspectionDto } from './dtos/create-driver-periodic-inspection.dto';
import { DriverService } from '../driver/driver.service';
import { DriverId } from '../driver/values/driver-id.value';
import { DriverNotFoundException } from '../driver/exceptions/driver-not-found.exception';
import { DateRangeIsInvalidException } from './exceptions/date-range-is-invalid.exception';
import { UpdateDriverPeriodicInspectionDto } from './dtos/update-driver-periodic-inspection.dto';
import { DriverPeriodicInspectionNotFoundException } from './exceptions/driver-periodic-inspection-not-found.exception';
import { SchemaValidator } from '../../shared/shared.validator';
import { FindDriverPeriodicInspectionOptionsBuilder } from './builders/find-driver-periodic-inspection-options.builder';

@Injectable()
export class DriverPeriodicInspectionService {
    private readonly logger = new Logger(DriverPeriodicInspectionService.name);

    @InjectRepository(DriverPeriodicInspection)
    private driverPeriodicInspectionRepository: Repository<DriverPeriodicInspection>;

    @Inject(DriverService)
    private driverService: DriverService;

    async isInspectionExist(id: DriverPeriodicInspectionId) {
        return (await this.getById(id)) !== null;
    }

    async getById(id: DriverPeriodicInspectionId, data?: RequestData) {
        return await this.driverPeriodicInspectionRepository.findOneBy({
            DriverId: id.DriverId,
            ToDate: id.ToDate,
            FromDate: id.FromDate,
            DocumentType: id.DocumentType
        });
    }

    async getAllBy(id: DriverPeriodicInspectionId, data: RequestData) {
        const options = new FindDriverPeriodicInspectionOptionsBuilder()
            .setDriverId(id)
            .setDocumentType(id)
            .setFromDate(id)
            .setToDate(id)
            .build();
        return await this.driverPeriodicInspectionRepository.find({ where: options });
    }

    async create(dto: CreateDriverPeriodicInspectionDto, data: RequestData) {
        new SchemaValidator(CreateDriverPeriodicInspectionDto.schema).validate(dto);
        const driverId = new DriverId(dto.DriverId)

        if (!(await this.driverService.ifDriverExist(driverId, data)))
            throw new DriverNotFoundException(driverId.value);

        if (dayjs(dto.FromDate).isAfter(dayjs(dto.ToDate))) throw new DateRangeIsInvalidException();

        const driverInspection = new DriverPeriodicInspectionBuilder()
            .setDriver(driverId.value)
            .setNote(dto.Note)
            .setDocumentType(dto.DocumentType)
            .setFromDate(dto.FromDate)
            .setToDate(dto.ToDate)
            .build();

        await this.driverPeriodicInspectionRepository.insert(driverInspection);

        return driverInspection;
    }

    async update(id: DriverPeriodicInspectionId, dto: UpdateDriverPeriodicInspectionDto, data?: RequestData) {
        new SchemaValidator(UpdateDriverPeriodicInspectionDto.schema).validate(dto);

        const isExist = await this.isInspectionExist(id);
        if (!isExist) throw new DriverPeriodicInspectionNotFoundException();

        const driverInspection = new DriverPeriodicInspectionBuilder()
            .setDriver(id.DriverId)
            .setDocumentType(id.DocumentType)
            .setFromDate(id.FromDate)
            .setToDate(id.ToDate)
            .setNote(dto.Note)
            .build();

        await this.driverPeriodicInspectionRepository.update(id, driverInspection);
    }

    async delete(id: DriverPeriodicInspectionId, data?: RequestData) {
        const isExist = await this.isInspectionExist(id);
        if (!isExist) throw new DriverPeriodicInspectionNotFoundException();

        await this.driverPeriodicInspectionRepository.delete(id);
    }
}
