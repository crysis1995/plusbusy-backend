import { Inject, Injectable } from '@nestjs/common';
import { VehicleMileage, VehicleMileageBuilder } from './entities/vehicle-mileage.entity';
import { VehicleService } from '../vehicle/vehicle.service';
import { VehicleMileageValidator } from './validators/vehicle-mileage.validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleMileageDto } from './dtos/create-vehicle-mileage.dto';
import { VehicleId } from '../vehicle/values/vehicle-id.value';
import { RequestData } from '../../shared/shared.types';
import { UserHasNoAccessException } from '../users/exceptions/user-has-no-access.exception';
import { VehicleMileageId } from './values/vehicle-mileage.id';

@Injectable()
export class VehicleMileageService {
    @InjectRepository(VehicleMileage)
    private vehicleMileageRepository: Repository<VehicleMileage>;
    @Inject(VehicleService)
    private vehicleService: VehicleService;

    public async getById(id: VehicleMileageId, data: RequestData) {
        if (await this.vehicleService.isUserHasAccessToVehicle(new VehicleId(id.VehicleId), data))
            return this.vehicleMileageRepository.findOneBy({
                VehicleId: id.VehicleId,
                Date: id.Date,
                MileageKm: id.MileageKm
            });

        throw new UserHasNoAccessException();
    }

    public async getAll(vehicleId: VehicleId) {
        return await this.vehicleMileageRepository.find({
            where: { VehicleId: vehicleId.value },
            order: { Date: 'ASC' }
        });
    }
    public async getNewest(vehicleId: VehicleId) {
        return await this.vehicleMileageRepository.findOne({
            where: { VehicleId: vehicleId.value },
            order: { Date: 'ASC' }
        });
    }

    public async save(dto: CreateVehicleMileageDto, data: RequestData) {
        const isUserHasAccess = await this.vehicleService.isUserHasAccessToVehicle(new VehicleId(dto.VehicleId), data);
        if (!isUserHasAccess) throw new UserHasNoAccessException();

        const vehicleMileage = await this.getNewest(new VehicleId(dto.VehicleId));
        if (vehicleMileage) new VehicleMileageValidator(vehicleMileage).validateMileage(dto.MileageKm);

        const newMileage = new VehicleMileageBuilder()
            .setMileageKm(dto.MileageKm)
            .setVehicle(dto.VehicleId)
            .setDate(dto.Date)
            .build();
        return await this.vehicleMileageRepository.save(newMileage);
    }

    public async delete(id: VehicleMileageId, data: RequestData) {
        const isUserHasAccess = await this.vehicleService.isUserHasAccessToVehicle(new VehicleId(id.VehicleId), data);
        if (!isUserHasAccess) throw new UserHasNoAccessException();

        await this.vehicleMileageRepository.delete({
            VehicleId: id.VehicleId,
            MileageKm: id.MileageKm,
            Date: id.Date
        });
    }
}
