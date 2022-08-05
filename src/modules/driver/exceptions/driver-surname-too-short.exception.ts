import { CustomException } from "../../../shared/shared.exception";
import { Driver } from "../entities/driver.entity";
import { GeneralDriverValidator } from "../validators/general-driver.validator";
import { HttpStatus } from "@nestjs/common";

export class DriverSurnameTooShortException extends CustomException<Driver> {
    constructor(driver: Driver) {
        super(driver);
    }

    custom_message = `Driver surname too short. Min is ${GeneralDriverValidator.DRIVER_SURNAME_MIN_LENGTH}`;
    custom_status = HttpStatus.BAD_REQUEST;
}
