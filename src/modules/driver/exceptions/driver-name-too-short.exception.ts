import { CustomException } from '../../../shared/shared.exception';
import { Driver } from '../entities/driver.entity';
import { GeneralDriverValidator } from '../validators/general-driver.validator';
import { HttpStatus } from '@nestjs/common';

export class DriverNameTooShortException extends CustomException<Driver> {
    constructor(driver: Driver) {
        super(driver);
    }

    custom_message = `Driver name too short. MIN is ${GeneralDriverValidator.DRIVER_NAME_MIN_LENGTH}`;
    custom_status = HttpStatus.BAD_REQUEST;
}
