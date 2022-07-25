import { Injectable, Logger } from '@nestjs/common';
import { Vehicle, VehicleBuilder } from './vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehicleValidator } from './vehicle.validator';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { generateObjectWithoutUndefinedValues } from '../../shared/shared.functions';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VehicleService {
    private readonly logger = new Logger(VehicleService.name);

    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>
    ) {}

    async exist(vehicleId: Vehicle['Id']) {
        return (await this.getVehicleByVehicleId(vehicleId)) !== null;
    }

    async getVehicleByVehicleId(vehicleId: Vehicle['Id']) {
        return await this.vehicleRepository.findOneBy({
            Id: vehicleId
        });
    }

    async getAllVehicles() {
        return await this.vehicleRepository.find();
    }

    async createVehicle(createVehicleDto: CreateVehicleDto) {
        const validator = new VehicleValidator(null);
        validator.checkIfValid(createVehicleDto);

        const vehicle = new VehicleBuilder()
            .setShortName(createVehicleDto.ShortName)
            .setPlates(createVehicleDto.Plates)
            .setSeatsCount(createVehicleDto.SeatsCount)
            .build();

        const response = await this.vehicleRepository.insert(vehicle);

        return response.identifiers;
    }

    async updateVehicle(VehicleId: number, updateVehicleDto: UpdateVehicleDto) {
        const validator = new VehicleValidator(null);
        validator.checkIfValid(updateVehicleDto);

        const valueToUpdate =
            generateObjectWithoutUndefinedValues(updateVehicleDto);

        await this.vehicleRepository.update({ Id: VehicleId }, valueToUpdate);
    }

    async deleteVehicle(vehicleId: Vehicle['Id']) {
        await this.vehicleRepository.delete({ Id: vehicleId });
    }
}
