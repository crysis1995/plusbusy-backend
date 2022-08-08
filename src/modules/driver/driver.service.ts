import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Driver, DriverBuilder } from './entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDriverDto } from './dtos/create-driver.dto';
import { DriverValidator } from './validators/driver.validator';
import { UpdateDriverDto } from './dtos/update-driver.dto';
import { DriverNotFoundException } from './exceptions/driver-not-found.exception';
import { generateObjectWithoutUndefinedValues } from '../../shared/shared.functions';
import { RequestData } from '../../shared/shared.types';
import { DriverId } from './values/driver-id.value';

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

    async createDriver(Dto: CreateDriverDto, data: RequestData) {
        const validator = new DriverValidator(Dto).validate();
        if (!validator.IsValid) return validator.errors;

        const driver = new DriverBuilder()
            .setEmail(Dto.Email)
            .setName(Dto.Name)
            .setSurname(Dto.Surname)
            .setPhone(Dto.Phone)
            .build();

        await this.driverRepository.insert(driver);
        return driver;
    }

    async updateDriver(
        driverId: DriverId,
        Dto: UpdateDriverDto,
        data: RequestData
    ) {
        const driver = await this.getById(driverId, data);
        if (!driver) throw new DriverNotFoundException(driverId.value);

        const validator = new DriverValidator(Dto).validate();
        if (!validator.IsValid) return validator.errors;

        /*
         *   TODO somehow update whole object also with domain
         *    specific props like when changes email need to confirm it one more time?
         *
         * */

        const dataToUpdate = generateObjectWithoutUndefinedValues(Dto);
        await this.driverRepository.update(
            { Id: driverId.value },
            dataToUpdate
        );
    }

    async deleteDriver(driverId: DriverId, data: RequestData) {
        const driver = await this.getById(driverId, data);
        if (driver === null) throw new DriverNotFoundException(driverId.value);
        await this.driverRepository.delete({ Id: driverId.value });
    }
}
