import { Inject, Injectable, Logger } from '@nestjs/common';
import { VehicleService } from '../vehicle/vehicle.service';
import { Repository } from 'typeorm';
import { VehiclePeriodicInspection } from './entities/vehicle-periodic-inspection.entity';
import { CreateVehiclePeriodicInspectionDto } from './dtos/create-vehicle-periodic-inspection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiclePeriodicInspectionKey } from './dtos/vehicle-periodic-inspection.key';

@Injectable()
export class VehiclePeriodicInspectionService {
    private readonly logger = new Logger(VehiclePeriodicInspectionService.name);

    @InjectRepository(VehiclePeriodicInspection)
    private vehiclePeriodicInspectionRepository: Repository<VehiclePeriodicInspection>;

    @Inject(VehicleService)
    private vehicleService: VehicleService;

    async exist(key: VehiclePeriodicInspectionKey) {
        return (await this.getById(key)) !== null;
    }

    async getById(key: VehiclePeriodicInspectionKey) {
        return this.vehiclePeriodicInspectionRepository.findOneBy(key);
    }

    async getNewest(
        VehicleId: VehiclePeriodicInspection['VehicleId'],
        InspectionType: VehiclePeriodicInspection['InspectionType'],
        all: boolean = false
    ) {
        if (all)
            return this.vehiclePeriodicInspectionRepository.find({
                where: { VehicleId, InspectionType },
                order: { FromDate: 'DESC' }
            });
        return this.vehiclePeriodicInspectionRepository.findOne({
            where: { VehicleId, InspectionType },
            order: { FromDate: 'DESC' }
        });
    }

    async getAll() {
        return await this.vehiclePeriodicInspectionRepository.find({});
    }
    async getAllOfVehicle(VehicleId: VehiclePeriodicInspection['VehicleId']) {
        return await this.vehiclePeriodicInspectionRepository.find({
            where: { VehicleId },
            order: { FromDate: 'DESC' }
        });
    }

    async create(dto: CreateVehiclePeriodicInspectionDto) {
        // await this.vehiclePeriodicInspectionRepository.insert()
    }

    async delete(key: VehiclePeriodicInspectionKey) {}
}
