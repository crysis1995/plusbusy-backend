import { Injectable } from '@nestjs/common';
import { VehicleService } from '../vehicle/vehicle.service';
import { Repository } from 'typeorm';
import { VehiclePeriodicInspection } from './vehicle-periodic-inspection.entity';
import { CreateVehiclePeriodicInspectionDto } from './dtos/create-vehicle-periodic-inspection.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VehiclePeriodicInspectionService {
    constructor(
        @InjectRepository(VehiclePeriodicInspection)
        private vehiclePeriodicInspectionRepository: Repository<VehiclePeriodicInspection>,
        private vehicleService: VehicleService
    ) {}

    async exist(
        VehicleId: VehiclePeriodicInspection['VehicleId'],
        FromDate: VehiclePeriodicInspection['FromDate'],
        ToDate: VehiclePeriodicInspection['ToDate'],
        InspectionType: VehiclePeriodicInspection['InspectionType']
    ) {
        return (
            (await this.getById(
                VehicleId,
                FromDate,
                ToDate,
                InspectionType
            )) !== null
        );
    }

    async getById(
        VehicleId: VehiclePeriodicInspection['VehicleId'],
        FromDate: VehiclePeriodicInspection['FromDate'],
        ToDate: VehiclePeriodicInspection['ToDate'],
        InspectionType: VehiclePeriodicInspection['InspectionType']
    ) {
        return await this.vehiclePeriodicInspectionRepository.findOneBy({
            VehicleId,
            FromDate,
            ToDate,
            InspectionType
        });
    }

    async getNewest(
        VehicleId: VehiclePeriodicInspection['VehicleId'],
        InspectionType: VehiclePeriodicInspection['InspectionType']
    ) {
        return await this.vehiclePeriodicInspectionRepository.findOne({
            where: { VehicleId, InspectionType },
            order: { FromDate: 'DESC' }
        });
    }

    async getAll() {
        return await this.vehiclePeriodicInspectionRepository.find({});
    }

    async create(dto: CreateVehiclePeriodicInspectionDto) {
        // await this.vehiclePeriodicInspectionRepository.insert()
    }

    async delete() {}
}
