import { CustomException } from '../../../shared/shared.exception';
import { Driver } from '../entities/driver.entity';
import { HttpStatus } from '@nestjs/common';

export class DriverEmailNotValidException extends CustomException<Driver> {
    constructor(driver: Driver) {
        super(driver);
    }

    custom_message = `Passed email is not valid!`;
    custom_status = HttpStatus.BAD_REQUEST;
}
