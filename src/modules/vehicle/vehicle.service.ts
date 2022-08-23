import { Inject, Injectable, Logger } from '@nestjs/common';
import { Vehicle, VehicleBuilder } from './entities/vehicle.entity';
import { In, Repository } from 'typeorm';
import { CreateVehicleDto, CreateVehicleDtoSchema } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto, UpdateVehicleDtoSchema } from './dtos/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from '../company/company.service';
import { UserHasNoAccessException } from '../users/exceptions/user-has-no-access.exception';
import { RequestData } from '../../shared/shared.types';
import { VehicleId } from './values/vehicle-id.value';
import { SchemaValidator } from '../../shared/shared.validator';

@Injectable()
export class VehicleService {
    private readonly logger = new Logger(VehicleService.name);

    @Inject(CompanyService)
    private companyService: CompanyService;

    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>;

    async exist(vehicleId: VehicleId, data?: RequestData) {
        return (
            (await this.vehicleRepository.count({
                where: { Id: vehicleId.value }
            })) > 0
        );
    }

    async isUserHasAccessToVehicle(vehicleId: VehicleId, data: RequestData) {
        const vehicle = await this.vehicleRepository.findOneBy({
            Id: vehicleId.value
        });
        if (!vehicle) return false
        return data.myCompanies.isContainCompany(vehicle.CompanyId);
    }

    async getByVehicle(vehicleId: VehicleId, data: RequestData) {
        const vehicle = await this.vehicleRepository.findOneBy({
            Id: vehicleId.value
        });
        if (!data?.company) {
            if (!data.myCompanies.isContainCompany(vehicle.CompanyId)) throw new UserHasNoAccessException();
        } else {
            if (vehicle.CompanyId !== data.company.CompanyId) throw new UserHasNoAccessException();
        }
        return vehicle;
    }

    async getAll(data: RequestData) {
        let CompanyId = !data.company ? In(data.myCompanies.getIds()) : data.company.CompanyId;
        return await this.vehicleRepository.findBy({ CompanyId });
    }

    async create(createVehicleDto: CreateVehicleDto, data: RequestData) {
        if (!data.myCompanies.isContainCompany(createVehicleDto.CompanyId)) throw new UserHasNoAccessException();

        new SchemaValidator(CreateVehicleDtoSchema).validate(createVehicleDto);

        const vehicleToCreate = new VehicleBuilder()
            .setShortName(createVehicleDto.ShortName)
            .setPlates(createVehicleDto.Plates)
            .setSeatsCount(createVehicleDto.SeatsCount)
            .setCompany(createVehicleDto.CompanyId)
            .build();

        return await this.vehicleRepository.save(vehicleToCreate);
    }

    async update(vehicleId: VehicleId, updateVehicleDto: UpdateVehicleDto, data: RequestData) {
        const vehicle = await this.vehicleRepository.findOneBy({ Id: vehicleId.value });
        if (!data.myCompanies.isContainCompany(vehicle.CompanyId)) throw new UserHasNoAccessException();

        new SchemaValidator(UpdateVehicleDtoSchema).validate(updateVehicleDto);

        const vehicleBuilder = new VehicleBuilder()
            .setPlates(updateVehicleDto.Plates)
            .setShortName(updateVehicleDto.ShortName)
            .setSeatsCount(updateVehicleDto.SeatsCount)
            .build();

        await this.vehicleRepository.update({ Id: vehicleId.value }, vehicleBuilder);
    }

    async delete(vehicleId: VehicleId, data: RequestData) {
        const vehicle = await this.vehicleRepository.findOneBy({ Id: vehicleId.value });
        if (!data.myCompanies.isContainCompany(vehicle.CompanyId)) throw new UserHasNoAccessException();
        await this.vehicleRepository.delete({ Id: vehicleId.value });
    }
}
