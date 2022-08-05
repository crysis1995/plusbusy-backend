import { Injectable, Logger } from '@nestjs/common';
import { Vehicle, VehicleBuilder } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleValidator } from './validators/vehicle.validator';
import { BasicCompanyDto } from '../company/dtos/BasicCompanyDto';

@Injectable()
export class VehicleService {
    private readonly logger = new Logger(VehicleService.name);

    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>;

    async exist(vehicleId: Vehicle['Id'], company: BasicCompanyDto) {
        return (await this.getVehicleByVehicleId(vehicleId, company)) !== null;
    }

    async getVehicleByVehicleId(vehicleId: Vehicle['Id'], company: BasicCompanyDto) {
        return await this.vehicleRepository.findOneBy({
            Id: vehicleId,
            CompanyId: company.Id
        });
    }

    async getAllVehicles(company: BasicCompanyDto) {
        return await this.vehicleRepository.find({ where: { CompanyId: company.Id } });
    }

    async createVehicle(createVehicleDto: CreateVehicleDto, company: BasicCompanyDto) {
        const validator = new VehicleValidator(createVehicleDto).validate();
        if (!validator.IsValid) return validator.errors;

        const vehicle = new VehicleBuilder()
            .setShortName(createVehicleDto.ShortName)
            .setPlates(createVehicleDto.Plates)
            .setSeatsCount(createVehicleDto.SeatsCount)
            .setCompany(company.Id)
            .build();

        await this.vehicleRepository.insert(vehicle);
        return vehicle;
    }

    async updateVehicle(VehicleId: number, updateVehicleDto: UpdateVehicleDto) {
        const validator = new VehicleValidator(updateVehicleDto).validate();
        if (!validator.IsValid) return validator.errors;

        const vehicleBuilder = new VehicleBuilder()
            .setPlates(updateVehicleDto.Plates)
            .setShortName(updateVehicleDto.ShortName)
            .setSeatsCount(updateVehicleDto.SeatsCount);

        await this.vehicleRepository.update({ Id: VehicleId }, vehicleBuilder.build());
    }

    async deleteVehicle(vehicleId: Vehicle['Id']) {
        await this.vehicleRepository.delete({ Id: vehicleId });
    }
}
