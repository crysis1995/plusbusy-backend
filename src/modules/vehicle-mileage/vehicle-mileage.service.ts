import { Inject, Injectable } from '@nestjs/common';
import {
    VehicleMileage,
    VehicleMileageBuilder
} from './entities/vehicle-mileage.entity';
import { VehicleNotFoundException } from '../vehicle/exceptions/vehicle-not-found.exception';
import { VehicleService } from '../vehicle/vehicle.service';
import { VehicleMileageValidator } from './validators/vehicle-mileage.validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleMileageDto } from './dtos/create-vehicle-mileage.dto';
import { VehicleId } from '../vehicle/values/vehicle-id.value';
import { RequestData } from '../../shared/shared.types';

@Injectable()
export class VehicleMileageService {
    @InjectRepository(VehicleMileage)
    private vehicleMileageRepository: Repository<VehicleMileage>;
    @Inject(VehicleService)
    private vehicleService: VehicleService;

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

    public async setVehicleMileage(
        dto: CreateVehicleMileageDto,
        data: RequestData
    ) {
        const isVehicleExist = await this.vehicleService.exist(
            new VehicleId(dto.VehicleId),
            data.company
        );
        if (!isVehicleExist)
            throw new VehicleNotFoundException({ Id: dto.VehicleId });

        const vehicleMileage = await this.getNewestVehicleMileage(
            dto.VehicleId
        );
        if (vehicleMileage != null) {
            new VehicleMileageValidator(vehicleMileage).validateMileage(
                dto.MileageKm
            );
        }

        const newMileage = new VehicleMileageBuilder()
            .setMileageKm(dto.MileageKm)
            .setVehicle(dto.VehicleId)
            .setDate(dto.Date)
            .build();
        await this.vehicleMileageRepository.insert(newMileage);

        return newMileage;
    }

    public async deleteVehicleMileage(
        VehicleId: number,
        MileageKm: number,
        Date: Date
    ) {
        await this.vehicleMileageRepository.delete({
            VehicleId,
            MileageKm,
            Date
        });
    }
}
