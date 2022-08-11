import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DriverPeriodicInspection,
    DriverPeriodicInspectionBuilder
} from './entities/driver-periodic-inspection.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { DriverPeriodicInspectionId } from './values/driver-periodic-inspection-id.value';
import { RequestData } from '../../shared/shared.types';
import dayjs from 'dayjs';
import {
    CreateDriverPeriodicInspectionDto,
    CreateDriverPeriodicInspectionDtoScheme
} from './dtos/create-driver-periodic-inspection.dto';
import { DriverService } from '../driver/driver.service';
import { DriverId } from '../driver/values/driver-id.value';
import { DriverNotFoundException } from '../driver/exceptions/driver-not-found.exception';
import { DateRangeIsInvalidException } from './exceptions/date-range-is-invalid.exception';
import {
    UpdateDriverPeriodicInspectionDto,
    UpdateDriverPeriodicInspectionDtoScheme
} from './dtos/update-driver-periodic-inspection.dto';
import { DriverPeriodicInspectionNotFoundException } from './exceptions/driver-periodic-inspection-not-found.exception';
import { SchemaValidator } from '../../shared/shared.validator';

@Injectable()
export class DriverPeriodicInspectionService {
    @InjectRepository(DriverPeriodicInspection)
    private driverPeriodicInspectionRepository: Repository<DriverPeriodicInspection>;

    @Inject(DriverService)
    private driverService: DriverService;

    async isInspectionExist(id: DriverPeriodicInspectionId) {
        return (await this.getInspectionById(id)) !== null;
    }

    async getInspectionById(id: DriverPeriodicInspectionId, data?: RequestData) {
        return await this.driverPeriodicInspectionRepository.findOneBy({
            DriverId: id.DriverId,
            ToDate: id.ToDate,
            FromDate: id.FromDate,
            DocumentType: id.DocumentType
        });
    }

    async getAllBy(id: DriverPeriodicInspectionId, data: RequestData) {
        const options: FindManyOptions<DriverPeriodicInspection> = {
            where: {}
        };

        if (id.DriverId) {
            options.where = {
                ...options.where,
                DriverId: id.DriverId
            };
        }
        if (id.DocumentType) {
            options.where = {
                ...options.where,
                DocumentType: id.DocumentType
            };
        }

        let fromDate = id.FromDate ? dayjs(id.FromDate) : null;
        let toDate = id.ToDate ? dayjs(id.ToDate) : null;

        if (fromDate && toDate) {
            if (toDate.isBefore(fromDate)) {
                toDate = dayjs(id.FromDate);
                fromDate = dayjs(id.ToDate);
            }
            options.where = {
                ...options.where,
                ToDate: toDate.toDate().toDateString(),
                FromDate: fromDate.toDate().toDateString()
            };
        } else {
            if (id.ToDate) {
                options.where = {
                    ...options.where,
                    ToDate: toDate.toDate().toDateString()
                };
            }
            if (id.FromDate) {
                options.where = {
                    ...options.where,
                    FromDate: fromDate.toDate().toDateString()
                };
            }
        }

        return await this.driverPeriodicInspectionRepository.find(options);
    }

    async createInspection(dto: CreateDriverPeriodicInspectionDto, data: RequestData) {
        new SchemaValidator(CreateDriverPeriodicInspectionDtoScheme).validate(dto);

        if (!(await this.driverService.ifDriverExist(new DriverId(dto.DriverId), data)))
            throw new DriverNotFoundException(dto.DriverId);

        if (dayjs(dto.FromDate).isAfter(dayjs(dto.ToDate))) throw new DateRangeIsInvalidException();

        const driverInspection = new DriverPeriodicInspectionBuilder()
            .setDriver(dto.DriverId)
            .setNote(dto.Note)
            .setDocumentType(dto.DocumentType)
            .setFromDate(dto.FromDate)
            .setToDate(dto.ToDate)
            .build();

        await this.driverPeriodicInspectionRepository.insert(driverInspection);

        return driverInspection;
    }

    async updateInspection(id: DriverPeriodicInspectionId, dto: UpdateDriverPeriodicInspectionDto, data?: RequestData) {
        new SchemaValidator(UpdateDriverPeriodicInspectionDtoScheme).validate(dto);

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

    async deleteInspection(id: DriverPeriodicInspectionId, data?: RequestData) {
        const isExist = await this.isInspectionExist(id);
        if (!isExist) throw new DriverPeriodicInspectionNotFoundException();

        await this.driverPeriodicInspectionRepository.delete(id);
    }
}
