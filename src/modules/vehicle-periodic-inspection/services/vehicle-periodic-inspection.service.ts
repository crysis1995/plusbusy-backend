import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {
    VehiclePeriodicInspection,
    VehiclePeriodicInspectionBuilder
} from '../entities/vehicle-periodic-inspection.entity';
import { CreateVehiclePeriodicInspectionDto } from '../dtos/create-vehicle-periodic-inspection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiclePeriodicInspectionId } from '../values/vehicle-periodic-inspection.id';
import { VehicleId } from '../../vehicle/values/vehicle-id.value';
import { RequestData } from '../../../shared/shared.types';
import { VehicleNotFoundException } from '../../vehicle/exceptions/vehicle-not-found.exception';
import { SchemaValidator } from '../../../shared/shared.validator';
import { UpdateVehiclePeriodicInspectionDto } from '../dtos/update-vehicle-periodic-inspection.dto';
import { UserHasNoAccessException } from '../../users/exceptions/user-has-no-access.exception';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class VehiclePeriodicInspectionService {
    private readonly logger = new Logger(VehiclePeriodicInspectionService.name);

    @InjectRepository(VehiclePeriodicInspection)
    private readonly vehiclePeriodicInspectionRepository: Repository<VehiclePeriodicInspection>;

    @Inject(VehicleService)
    private readonly vehicleService: VehicleService;

    async getById(key: VehiclePeriodicInspectionId, data?: RequestData) {
        this.validateDates(key);
        if (!(await this.vehicleService.ifUserHasAccess(key.VehicleId, data)))
            throw new UserHasNoAccessException();

        const options: FindOneOptions<VehiclePeriodicInspection> = {
            where: {
                VehicleId: key.VehicleId,
                FromDate: key.FromDate.toDate(),
                ToDate: key.ToDate.toDate(),
                InspectionType: key.InspectionType
            }
        };

        return this.vehiclePeriodicInspectionRepository.findOne(options);
    }

    async getNewest(
        VehicleId: VehicleId,
        InspectionType: VehiclePeriodicInspection['InspectionType'],
        data: RequestData
    ) {
        if (!(await this.vehicleService.ifUserHasAccess(VehicleId, data)))
            throw new UserHasNoAccessException();

        const options: FindManyOptions<VehiclePeriodicInspection> = {
            where: { VehicleId: VehicleId.value, InspectionType },
            order: { FromDate: 'DESC' }
        };

        return this.vehiclePeriodicInspectionRepository.findOne(options);
    }

    async getAll(data: RequestData) {
        const options: FindManyOptions<VehiclePeriodicInspection> = {
            where: {
                Vehicle: {
                    Company: {
                        AdminId: data.user.UserId
                    }
                }
            },
            order: { FromDate: 'DESC' }
        };

        return await this.vehiclePeriodicInspectionRepository.find(options);
    }
    async getAllByVehicle(VehicleId: VehicleId, data?: RequestData) {
        const options: FindManyOptions<VehiclePeriodicInspection> = {
            where: { VehicleId: VehicleId.value },
            order: { FromDate: 'DESC' }
        };

        return await this.vehiclePeriodicInspectionRepository.find(options);
    }

    async create(dto: CreateVehiclePeriodicInspectionDto, data: RequestData) {
        if (!(await this.vehicleService.ifUserHasAccess(dto.VehicleId, data)))
            throw new UserHasNoAccessException();

        new SchemaValidator(CreateVehiclePeriodicInspectionDto.schema).validate(dto);
        const vehicle = await this.vehicleService.getByVehicle(new VehicleId(dto.VehicleId), data);
        if (!vehicle) throw new VehicleNotFoundException(new VehicleId(dto.VehicleId));

        const newVehiclePeriodicInspection = new VehiclePeriodicInspectionBuilder()
            .setVehicle(dto.VehicleId)
            .setInspectionType(dto.InspectionType)
            .setFromDate(dto.FromDate)
            .setToDate(dto.ToDate)
            .setNote(dto.Note)
            .build();

        await this.vehiclePeriodicInspectionRepository.insert(newVehiclePeriodicInspection);

        return newVehiclePeriodicInspection;
    }

    async update(
        id: VehiclePeriodicInspectionId,
        dto: UpdateVehiclePeriodicInspectionDto,
        data: RequestData
    ) {
        this.validateDates(id);
        if (!(await this.vehicleService.ifUserHasAccess(id.VehicleId, data)))
            throw new UserHasNoAccessException();

        new SchemaValidator(UpdateVehiclePeriodicInspectionDto.schema).validate(dto);

        const entity = await this.getById(id);
        if (!entity) throw new NotFoundException();

        entity.Note = dto.Note;
        await this.vehiclePeriodicInspectionRepository.save(entity);
    }

    async delete(id: VehiclePeriodicInspectionId, data: RequestData) {
        this.validateDates(id);
        if (!(await this.vehicleService.ifUserHasAccess(id.VehicleId, data)))
            throw new UserHasNoAccessException();

        const entity = await this.getById(id);
        if (!entity) throw new NotFoundException();

        const options: FindOptionsWhere<VehiclePeriodicInspection> = {
            VehicleId: id.VehicleId,
            FromDate: id.FromDate.toDate(),
            ToDate: id.ToDate.toDate(),
            InspectionType: id.InspectionType
        };

        await this.vehiclePeriodicInspectionRepository.delete(options);
    }

    validateDates(id: VehiclePeriodicInspectionId) {
        if (id.FromDate.isAfter(id.ToDate))
            throw new BadRequestException('From date should be before to date');
    }
}
