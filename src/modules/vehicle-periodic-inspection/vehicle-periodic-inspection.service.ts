import { Inject, Injectable, Logger } from '@nestjs/common';
import { VehicleService } from '../vehicle/vehicle.service';
import { Repository } from 'typeorm';
import { VehiclePeriodicInspection } from './entities/vehicle-periodic-inspection.entity';
import { CreateVehiclePeriodicInspectionDto } from './dtos/create-vehicle-periodic-inspection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiclePeriodicInspectionId } from './values/vehicle-periodic-inspection.id';
import { VehicleId } from '../vehicle/values/vehicle-id.value';
import { RequestData } from '../../shared/shared.types';
import { VehicleNotFoundException } from '../vehicle/exceptions/vehicle-not-found.exception';
import { SchemaValidator } from '../../shared/shared.validator';
import { UpdateVehiclePeriodicInspectionDto } from './dtos/update-vehicle-periodic-inspection.dto';
import { UserHasNoAccessException } from '../users/exceptions/user-has-no-access.exception';

@Injectable()
export class VehiclePeriodicInspectionService {
    private readonly logger = new Logger(VehiclePeriodicInspectionService.name);

    @InjectRepository(VehiclePeriodicInspection)
    private readonly vehiclePeriodicInspectionRepository: Repository<VehiclePeriodicInspection>;

    @Inject(VehicleService)
    private readonly vehicleService: VehicleService;

    async exist(key: VehiclePeriodicInspectionId, data?: RequestData) {
        if (!(await this.vehicleService.ifUserHasAccess(key.VehicleId, data)))
            throw new UserHasNoAccessException();

        return (await this.vehiclePeriodicInspectionRepository.countBy(key)) > 0;
    }

    async getById(key: VehiclePeriodicInspectionId, data?: RequestData) {
        if (!(await this.vehicleService.ifUserHasAccess(key.VehicleId, data)))
            throw new UserHasNoAccessException();

        return this.vehiclePeriodicInspectionRepository.findOneBy(key);
    }

    async getNewest(
        VehicleId: VehicleId,
        InspectionType: VehiclePeriodicInspection['InspectionType'],
        data?: RequestData,
        all: boolean = false
    ) {
        if (!(await this.vehicleService.ifUserHasAccess(VehicleId, data)))
            throw new UserHasNoAccessException();

        if (all)
            return this.vehiclePeriodicInspectionRepository.find({
                where: { VehicleId: VehicleId.value, InspectionType },
                order: { FromDate: 'DESC' }
            });
        return this.vehiclePeriodicInspectionRepository.findOne({
            where: { VehicleId: VehicleId.value, InspectionType },
            order: { FromDate: 'DESC' }
        });
    }

    async getAll(data: RequestData) {
        return await this.vehiclePeriodicInspectionRepository.find({
            where: {
                Vehicle: {
                    Company: {
                        AdminId: data.user.UserId
                    }
                }
            }
        });
    }
    async getAllOfVehicle(VehicleId: VehicleId, data?: RequestData) {
        return await this.vehiclePeriodicInspectionRepository.find({
            where: { VehicleId: VehicleId.value },
            order: { FromDate: 'DESC' }
        });
    }

    async create(dto: CreateVehiclePeriodicInspectionDto, data: RequestData) {
        if (!(await this.vehicleService.ifUserHasAccess(dto.VehicleId, data)))
            throw new UserHasNoAccessException();

        new SchemaValidator(CreateVehiclePeriodicInspectionDto.schema).validate(dto);
        const vehicle = await this.vehicleService.getVehicleByVehicleId(
            new VehicleId(dto.VehicleId),
            data
        );
        if (!vehicle) throw new VehicleNotFoundException(new VehicleId(dto.VehicleId));
    }

    async update(
        id: VehiclePeriodicInspectionId,
        dto: UpdateVehiclePeriodicInspectionDto,
        data: RequestData
    ) {
        new SchemaValidator(UpdateVehiclePeriodicInspectionDto.schema).validate(dto);

        const entity = await this.getById(id);
        if (!entity) return;
    }

    async delete(id: VehiclePeriodicInspectionId, data: RequestData) {}
}
