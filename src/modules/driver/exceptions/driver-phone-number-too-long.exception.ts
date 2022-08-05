import { CustomException } from "../../../shared/shared.exception";
import { Driver } from "../entities/driver.entity";
import { HttpStatus } from "@nestjs/common";
import { GeneralDriverValidator } from "../validators/general-driver.validator";

export class DriverPhoneNumberTooLongException extends CustomException<Driver> {
    constructor(driver: Driver) {
        super(driver);
    }

    custom_message = `Driver phone number too long. Max is ${GeneralDriverValidator.DRIVER_PHONE_NUMBER_MAX_LENGTH}`;
    custom_status = HttpStatus.BAD_REQUEST;
}
