import { CustomException } from "../../../shared/shared.exception";
import { Driver } from "../entities/driver.entity";
import { HttpStatus } from "@nestjs/common";

export class DriverNotFoundException extends CustomException<Driver | number> {
    constructor(driver: Driver | number) {
        super(driver);
    }

    custom_message = `Not found driver with ID: ${typeof this.Object === 'object' ? this.Object.Id : this.Object}`;
    custom_status = HttpStatus.NOT_FOUND;
}
