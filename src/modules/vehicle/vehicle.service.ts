import { Inject, Injectable, Logger } from '@nestjs/common';
import { Vehicle, VehicleBuilder } from './entities/vehicle.entity';
import { In, Repository } from 'typeorm';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleValidator } from './validators/vehicle.validator';
import { CompanyService } from '../company/company.service';
import { UserHasNoAccessException } from '../users/exceptions/user-has-no-access.exception';
import { RequestData } from '../../shared/shared.types';
import { VehicleId } from './values/vehicle-id.value';

@Injectable()
export class VehicleService {
    private readonly logger = new Logger(VehicleService.name);

    @Inject(CompanyService)
    private companyService: CompanyService;

    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>;

    async exist(vehicleId: VehicleId, data?: RequestData) {
        return (await this.getVehicleByVehicleId(vehicleId, data)) !== null;
    }

    async getVehicleByVehicleId(vehicleId: VehicleId, data?: RequestData) {
        const vehicle = await this.vehicleRepository.findOneBy({
            Id: vehicleId.value
        });
        if (!data?.company) {
            const companiesID = (await this.companyService.getMyCompanies(data)).map((x) => x.Id);
            if (!(vehicle.CompanyId in companiesID)) throw new UserHasNoAccessException();
        } else {
            if (vehicle.CompanyId !== data.company.CompanyId) throw new UserHasNoAccessException();
        }
        return vehicle;
    }

    async getAllVehicles(data: RequestData) {
        let CompanyId;
        if (!data.company) {
            CompanyId = In((await this.companyService.getMyCompanies(data)).map((x) => x.Id));
        } else CompanyId = data.company.CompanyId;

        return await this.vehicleRepository.findBy({ CompanyId });
    }

    async createVehicle(createVehicleDto: CreateVehicleDto, data: RequestData) {
        const hasAccess = this.companyService.ifUserHasAccess(data);
        if (!hasAccess) throw new UserHasNoAccessException();

        const validator = new VehicleValidator(createVehicleDto).validate();
        if (!validator.IsValid) return validator.errors;

        const vehicle = new VehicleBuilder()
            .setShortName(createVehicleDto.ShortName)
            .setPlates(createVehicleDto.Plates)
            .setSeatsCount(createVehicleDto.SeatsCount)
            .setCompany(createVehicleDto.CompanyId)
            .build();

        await this.vehicleRepository.insert(vehicle);
        return vehicle;
    }

    async updateVehicle(vehicleId: VehicleId, updateVehicleDto: UpdateVehicleDto, data: RequestData) {
        if (!(await this.companyService.ifUserHasAccess(data))) throw new UserHasNoAccessException();

        const validator = new VehicleValidator(updateVehicleDto).validate();
        if (!validator.IsValid) return validator.errors;

        const vehicleBuilder = new VehicleBuilder()
            .setPlates(updateVehicleDto.Plates)
            .setShortName(updateVehicleDto.ShortName)
            .setSeatsCount(updateVehicleDto.SeatsCount)
            .setCompany(data.company.CompanyId);

        await this.vehicleRepository.update({ Id: vehicleId.value }, vehicleBuilder.build());
    }

    async deleteVehicle(vehicleId: VehicleId, data: RequestData) {
        if (!(await this.companyService.ifUserHasAccess(data))) throw new UserHasNoAccessException();
        await this.vehicleRepository.delete({ Id: vehicleId.value });
    }
}
