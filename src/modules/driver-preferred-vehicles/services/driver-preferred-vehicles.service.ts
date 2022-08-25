import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RequestData, UserHasAccess } from '../../../shared/shared.types';
import { PreferredTypeEnum } from '../enums/preferred-type.enum';
import { DriverService } from '../../driver/services/driver.service';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DriverPreferredVehicles,
    DriverPreferredVehiclesBuilder
} from '../entities/driver-preferred-vehicles.entity';
import { Repository } from 'typeorm';
import { FindDriverPreferredVehiclesOptionsBuilder } from '../builders/find-driver-preferred-vehicles-options.builder';
import { CreateDriverPreferredVehiclesDto } from '../dtos/create-driver-preferred-vehicles.dto';
import { SchemaValidator } from '../../../shared/shared.validator';
import { DriverPreferredVehiclesId } from '../values/driver-preferred-vehicles.id';
import { UpdateDriverPreferredVehiclesDto } from '../dtos/update-driver-preferred-vehicles.dto';
import { UserHasNoAccessException } from '../../users/exceptions/user-has-no-access.exception';

@Injectable()
export class DriverPreferredVehiclesService implements UserHasAccess<DriverPreferredVehiclesId> {
    @Inject(DriverService)
    private driverService: DriverService;

    @Inject(VehicleService)
    private vehicleService: VehicleService;

    @InjectRepository(DriverPreferredVehicles)
    private driverPreferredVehiclesRepository: Repository<DriverPreferredVehicles>;

    async getAllByType(id: number, type: PreferredTypeEnum, data: RequestData) {
        if (!type || !id) throw new BadRequestException('Type and Id must be filled.');

        const options = new FindDriverPreferredVehiclesOptionsBuilder();
        switch (type) {
            case PreferredTypeEnum.BY_DRIVER:
                options.setDriverId(id);
                break;
            case PreferredTypeEnum.BY_VEHICLE:
                options.setVehicleId(id);
                break;
            default:
                break;
        }

        return await this.driverPreferredVehiclesRepository.find({ where: options.build() });
    }

    async getById(id: DriverPreferredVehiclesId, data: RequestData) {
        if (!(await this.ifUserHasAccess(id, data))) throw new UserHasNoAccessException();

        return await this.driverPreferredVehiclesRepository.findOne({
            where: { VehicleId: id.VehicleId, DriverId: id.DriverId }
        });
    }

    async create(dto: CreateDriverPreferredVehiclesDto, data: RequestData) {
        new SchemaValidator(CreateDriverPreferredVehiclesDto.schema).validate(data);

        const entity = new DriverPreferredVehiclesBuilder()
            .setDriverId(dto.DriverId)
            .setVehicleId(dto.VehicleId)
            .setNote(dto.Note)
            .build();

        return await this.driverPreferredVehiclesRepository.save(entity);
    }

    async update(
        id: DriverPreferredVehiclesId,
        dto: UpdateDriverPreferredVehiclesDto,
        data: RequestData
    ) {
        const entity = await this.getById(id, data);
        if (!entity) throw new NotFoundException();

        new SchemaValidator(UpdateDriverPreferredVehiclesDto.schema).validate(dto);

        const entityToUpdate = new DriverPreferredVehiclesBuilder()
            .setDriverId(id.DriverId)
            .setVehicleId(id.VehicleId)
            .setNote(dto.Note)
            .build();

        await this.driverPreferredVehiclesRepository.update(id, entityToUpdate);
    }
    async delete(id: DriverPreferredVehiclesId, data: RequestData) {
        const entity = await this.getById(id, data);
        if (!entity) throw new NotFoundException();

        await this.driverPreferredVehiclesRepository.delete(id);
    }

    async ifUserHasAccess(id: DriverPreferredVehiclesId, data: RequestData): Promise<boolean> {
        let hasAccess = true;
        if (!(await this.driverService.ifUserHasAccess(id.DriverId, data))) {
            hasAccess = false;
        }
        if (!(await this.vehicleService.ifUserHasAccess(id.VehicleId, data))) {
            hasAccess = false;
        }
        return hasAccess;
    }
}
