import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Driver, DriverBuilder } from './entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDriverDto } from './dtos/create-driver.dto';
import { UpdateDriverDto } from './dtos/update-driver.dto';
import { DriverNotFoundException } from './exceptions/driver-not-found.exception';
import { RequestData } from '../../shared/shared.types';
import { DriverId } from './values/driver-id.value';
import { SchemaValidator } from '../../shared/shared.validator';

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

    async create(dto: CreateDriverDto, data: RequestData) {
        new SchemaValidator(CreateDriverDto.schema).validate(dto);

        const driver = new DriverBuilder()
            .setEmail(dto.Email)
            .setName(dto.Name)
            .setSurname(dto.Surname)
            .setPhone(dto.Phone)
            .build();

        await this.driverRepository.insert(driver);
        return driver;
    }

    async update(driverId: DriverId, dto: UpdateDriverDto, data: RequestData) {
        new SchemaValidator(UpdateDriverDto.schema).validate(dto);
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

    async delete(driverId: DriverId, data: RequestData) {
        const driver = await this.getById(driverId, data);
        if (driver === null) throw new DriverNotFoundException(driverId.value);
        await this.driverRepository.delete({ Id: driverId.value });
    }
}
