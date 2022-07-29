import { CustomException } from "../../../shared/shared.exception";
import { Driver } from "../driver.entity";
import { GeneralDriverValidator } from "../validators/general-driver.validator";
import { HttpStatus } from "@nestjs/common";

export class DriverSurnameTooLongException extends CustomException<Driver> {
    constructor(driver: Driver) {
        super(driver);
    }

    custom_message = `Driver surname too long. Max is ${GeneralDriverValidator.DRIVER_SURNAME_MAX_LENGTH}`;
    custom_status = HttpStatus.BAD_REQUEST;
}
