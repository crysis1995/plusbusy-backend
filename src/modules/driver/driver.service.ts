import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Driver, DriverBuilder } from './entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDriverDto, CreateDriverDtoScheme } from './dtos/create-driver.dto';
import { UpdateDriverDto, UpdateDriverDtoSchema } from './dtos/update-driver.dto';
import { DriverNotFoundException } from './exceptions/driver-not-found.exception';
import { RequestData } from '../../shared/shared.types';
import { DriverId } from './values/driver-id.value';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

@Injectable()
export class DriverService {
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>;

    async ifDriverExist(driverId: DriverId, data: RequestData) {
        return (await this.getById(driverId, data)) !== null;
    }

    getById(driverId: DriverId, data: RequestData) {
        return this.driverRepository.findOneBy({ Id: driverId.value });
    }

    getAll(data: RequestData) {
        return this.driverRepository.find();
    }

    async createDriver(dto: CreateDriverDto, data: RequestData) {
        new ValidationPipe(CreateDriverDtoScheme).transform(dto, null);

        const driver = new DriverBuilder()
            .setEmail(dto.Email)
            .setName(dto.Name)
            .setSurname(dto.Surname)
            .setPhone(dto.Phone)
            .build();

        await this.driverRepository.insert(driver);
        return driver;
    }

    async updateDriver(driverId: DriverId, dto: UpdateDriverDto, data: RequestData) {
        new ValidationPipe(UpdateDriverDtoSchema).transform(dto, null);
        const driver = await this.getById(driverId, data);
        if (!driver) throw new DriverNotFoundException(driverId.value);

        /*
         *   TODO somehow update whole object also with domain
         *    specific props like when changes email need to confirm it one more time?
         *
         * */
        const driverToUpdate = new DriverBuilder()
            .setName(dto.Name)
            .setSurname(dto.Surname)
            .setEmail(dto.Email)
            .setPhone(dto.Phone)
            .build();

        await this.driverRepository.update({ Id: driverId.value }, driverToUpdate);
    }

    async deleteDriver(driverId: DriverId, data: RequestData) {
        const driver = await this.getById(driverId, data);
        if (driver === null) throw new DriverNotFoundException(driverId.value);
        await this.driverRepository.delete({ Id: driverId.value });
    }
}
