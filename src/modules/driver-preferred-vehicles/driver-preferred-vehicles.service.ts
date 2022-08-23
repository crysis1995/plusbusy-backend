import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DriverId } from '../driver/values/driver-id.value';
import { VehicleId } from '../vehicle/values/vehicle-id.value';
import { RequestData } from '../../shared/shared.types';
import { PreferredTypeEnum } from './enums/preferred-type.enum';
import { DriverService } from '../driver/driver.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DriverPreferredVehicles,
    DriverPreferredVehiclesBuilder
} from './entities/driver-preferred-vehicles.entity';
import { Repository } from 'typeorm';
import { FindDriverPreferredVehiclesOptionsBuilder } from './builders/find-driver-preferred-vehicles-options.builder';
import { CreateDriverPreferredVehiclesDto } from './dtos/create-driver-preferred-vehicles.dto';
import { SchemaValidator } from '../../shared/shared.validator';
import { DriverPreferredVehiclesId } from './values/driver-preferred-vehicles.id';
import { UpdateDriverPreferredVehiclesDto } from './dtos/update-driver-preferred-vehicles.dto';

@Injectable()
export class DriverPreferredVehiclesService {
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

    async getById(DriverId: DriverId, VehicleId: VehicleId, data: RequestData) {
        return await this.driverPreferredVehiclesRepository.findOne({
            where: { VehicleId: VehicleId.value, DriverId: DriverId.value }
        });
    }

    async createRelation(dto: CreateDriverPreferredVehiclesDto, data: RequestData) {
        new SchemaValidator(CreateDriverPreferredVehiclesDto.schema).validate(data);

        const entity = new DriverPreferredVehiclesBuilder()
            .setDriverId(dto.DriverId)
            .setVehicleId(dto.VehicleId)
            .setNote(dto.Note)
            .build();

        return await this.driverPreferredVehiclesRepository.save(entity);
    }

    async updateRelation(
        id: DriverPreferredVehiclesId,
        dto: UpdateDriverPreferredVehiclesDto,
        data: RequestData
    ) {
        const entity = await this.getById(
            new DriverId(id.DriverId),
            new VehicleId(id.VehicleId),
            data
        );
        if (!entity) throw new BadRequestException();

        new SchemaValidator(UpdateDriverPreferredVehiclesDto.schema).validate(dto);

        const entityToUpdate = new DriverPreferredVehiclesBuilder()
            .setDriverId(id.DriverId)
            .setVehicleId(id.VehicleId)
            .setNote(dto.Note)
            .build();

        await this.driverPreferredVehiclesRepository.update(id, entityToUpdate);
    }
    async deleteRelation(id: DriverPreferredVehiclesId, data: RequestData) {}
}
