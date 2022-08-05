import { Injectable } from '@nestjs/common';
import { VehicleMileage, VehicleMileageBuilder } from './entities/vehicle-mileage.entity';
import { VehicleNotFoundException } from '../vehicle/exceptions/vehicle-not-found.exception';
import { VehicleService } from '../vehicle/vehicle.service';
import { VehicleMileageValidator } from './validators/vehicle-mileage.validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VehicleMileageService {
    constructor(
        @InjectRepository(VehicleMileage)
        private vehicleMileageRepository: Repository<VehicleMileage>,
        private vehicleService: VehicleService
    ) {}

    public async getAllVehicleMileages(VehicleId: number) {
        return await this.vehicleMileageRepository.find({
            where: { VehicleId },
            order: { Date: 'ASC' }
        });
    }
    public async getNewestVehicleMileage(VehicleId: number) {
        return await this.vehicleMileageRepository.findOne({
            where: { VehicleId },
            order: { Date: 'ASC' }
        });
    }

    public async setVehicleMileage(VehicleId: number, MileageKm: number, Date?: Date) {
        const isVehicleExist = await this.vehicleService.exist(VehicleId);
        if (!isVehicleExist) throw new VehicleNotFoundException({ Id: VehicleId });

        const vehicleMileage = await this.getNewestVehicleMileage(VehicleId);
        if (vehicleMileage != null) {
            new VehicleMileageValidator(vehicleMileage).validateMileage(MileageKm);
        }

        const newMileage = new VehicleMileageBuilder()
            .setMileageKm(MileageKm)
            .setVehicle(VehicleId)
            .setDate(Date)
            .build();
        await this.vehicleMileageRepository.insert(newMileage);

        return newMileage;
    }

    public async deleteVehicleMileage(VehicleId: number, MileageKm: number, Date: Date) {
        await this.vehicleMileageRepository.delete({ VehicleId, MileageKm, Date });
    }
}
