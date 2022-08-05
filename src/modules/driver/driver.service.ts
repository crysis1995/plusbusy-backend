import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Driver, DriverBuilder } from './entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDriverDto } from './dtos/create-driver.dto';
import { DriverValidator } from './validators/driver.validator';
import { UpdateDriverDto } from './dtos/update-driver.dto';
import { DriverNotFoundException } from './exceptions/driver-not-found.exception';
import { generateObjectWithoutUndefinedValues } from '../../shared/shared.functions';

@Injectable()
export class DriverService {
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>;

    getById(Id: Driver['Id']) {
        return this.driverRepository.findOneBy({ Id });
    }

    getAll() {
        return this.driverRepository.find();
    }

    async createDriver(Dto: CreateDriverDto) {
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

    async updateDriver(Id: Driver['Id'], Dto: UpdateDriverDto) {
        const driver = await this.getById(Id);
        if (driver === null) throw new DriverNotFoundException(Id);

        const validator = new DriverValidator(Dto).validate();
        if (!validator.IsValid) return validator.errors;

        /*
         *   TODO somehow update whole object also with domain
         *    specific props like when changes email need to confirm it one more time?
         *
         * */

        const dataToUpdate = generateObjectWithoutUndefinedValues(Dto);
        await this.driverRepository.update({ Id }, dataToUpdate);
    }

    async deleteDriver(Id: Driver['Id']) {
        const driver = await this.getById(Id);
        if (driver === null) throw new DriverNotFoundException(Id);
        await this.driverRepository.delete({ Id });
    }
}
