import { Inject, Injectable } from '@nestjs/common';
import { VehicleMileage, VehicleMileageBuilder } from '../entities/vehicle-mileage.entity';
import { VehicleService } from '../../vehicle/services/vehicle.service';
import { VehicleMileageValidator } from '../validators/vehicle-mileage.validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVehicleMileageDto } from '../dtos/create-vehicle-mileage.dto';
import { VehicleId } from '../../vehicle/values/vehicle-id.value';
import { RequestData, UserHasAccess } from '../../../shared/shared.types';
import { UserHasNoAccessException } from '../../users/exceptions/user-has-no-access.exception';
import { VehicleMileageId } from '../values/vehicle-mileage.id';

@Injectable()
export class VehicleMileageService implements UserHasAccess<VehicleMileageId> {
    @InjectRepository(VehicleMileage)
    private vehicleMileageRepository: Repository<VehicleMileage>;

    @Inject(VehicleService)
    private vehicleService: VehicleService;

    public async getById(id: VehicleMileageId, data: RequestData) {
        if (!(await this.ifUserHasAccess(id, data))) throw new UserHasNoAccessException();

        return this.vehicleMileageRepository.findOneBy({
            VehicleId: id.VehicleId,
            Date: id.Date,
            MileageKm: id.MileageKm
        });
    }

    public async getAllByVehicle(vehicleId: VehicleId, data: RequestData) {
        if (!(await this.vehicleService.ifUserHasAccess(vehicleId, data)))
            throw new UserHasNoAccessException();

        return await this.vehicleMileageRepository.find({
            where: { VehicleId: vehicleId.value },
            order: { Date: 'ASC' }
        });
    }
    public async getNewestByVehicle(vehicleId: VehicleId, data: RequestData) {
        if (!(await this.vehicleService.ifUserHasAccess(vehicleId, data)))
            throw new UserHasNoAccessException();

        return await this.vehicleMileageRepository.findOne({
            where: { VehicleId: vehicleId.value },
            order: { Date: 'ASC' }
        });
    }

    public async save(dto: CreateVehicleMileageDto, data: RequestData) {
        const vehicleId = new VehicleId(dto.VehicleId);
        const isUserHasAccess = await this.vehicleService.ifUserHasAccess(vehicleId, data);
        if (!isUserHasAccess) throw new UserHasNoAccessException();

        const vehicleMileage = await this.getNewestByVehicle(vehicleId, data);
        if (vehicleMileage)
            new VehicleMileageValidator(vehicleMileage).validateMileage(dto.MileageKm);

        const newMileage = new VehicleMileageBuilder()
            .setMileageKm(dto.MileageKm)
            .setVehicle(dto.VehicleId)
            .setDate(dto.Date)
            .build();
        return await this.vehicleMileageRepository.save(newMileage);
    }

    public async delete(id: VehicleMileageId, data: RequestData) {
        const isUserHasAccess = await this.ifUserHasAccess(id, data);
        if (!isUserHasAccess) throw new UserHasNoAccessException();

        await this.vehicleMileageRepository.delete({
            VehicleId: id.VehicleId,
            MileageKm: id.MileageKm,
            Date: id.Date
        });
    }

    async ifUserHasAccess(entity: VehicleMileageId, data: RequestData): Promise<boolean> {
        let hasAccess = await this.vehicleService.ifUserHasAccess(entity.VehicleId, data);
        return hasAccess;
    }
}
