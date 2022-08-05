import { CustomException } from "../../../shared/shared.exception";
import { Driver } from "../entities/driver.entity";
import { GeneralDriverValidator } from "../validators/general-driver.validator";
import { HttpStatus } from "@nestjs/common";

export class DriverPhoneNumberTooShortException extends CustomException<Driver> {
    constructor(driver: Driver) {
        super(driver);
    }

    custom_message = `Driver phone number too short. Max is ${GeneralDriverValidator.DRIVER_PHONE_NUMBER_MIN_LENGTH}`;
    custom_status = HttpStatus.BAD_REQUEST;
}
