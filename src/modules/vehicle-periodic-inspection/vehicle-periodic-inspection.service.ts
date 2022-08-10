import { Inject, Injectable, Logger } from '@nestjs/common';
import { VehicleService } from '../vehicle/vehicle.service';
import { Repository } from 'typeorm';
import { VehiclePeriodicInspection } from './entities/vehicle-periodic-inspection.entity';
import {
    CreateVehiclePeriodicInspectionDto,
    CreateVehiclePeriodicInspectionDtoSchema
} from './dtos/create-vehicle-periodic-inspection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiclePeriodicInspectionKey } from './dtos/vehicle-periodic-inspection.key';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { VehicleId } from '../vehicle/values/vehicle-id.value';
import { RequestData } from '../../shared/shared.types';
import { VehicleNotFoundException } from '../vehicle/exceptions/vehicle-not-found.exception';

@Injectable()
export class VehiclePeriodicInspectionService {
    private readonly logger = new Logger(VehiclePeriodicInspectionService.name);

    @InjectRepository(VehiclePeriodicInspection)
    private vehiclePeriodicInspectionRepository: Repository<VehiclePeriodicInspection>;

    @Inject(VehicleService)
    private vehicleService: VehicleService;

    async exist(key: VehiclePeriodicInspectionKey, data?: RequestData) {
        return (await this.getById(key)) !== null;
    }

    async getById(key: VehiclePeriodicInspectionKey, data?: RequestData) {
        return this.vehiclePeriodicInspectionRepository.findOneBy(key);
    }

    async getNewest(
        VehicleId: VehicleId,
        InspectionType: VehiclePeriodicInspection['InspectionType'],
        data?: RequestData,
        all: boolean = false
    ) {
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
        new ValidationPipe(CreateVehiclePeriodicInspectionDtoSchema).transform(dto, null);
        const vehicleId = new VehicleId(dto.VehicleId);
        const isExist = await this.vehicleService.exist(vehicleId, data);
        if (!isExist) throw new VehicleNotFoundException(vehicleId);
    }

    async delete(key: VehiclePeriodicInspectionKey) {}
}
