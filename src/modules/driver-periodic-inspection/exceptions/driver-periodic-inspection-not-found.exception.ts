import { HttpException, HttpStatus } from '@nestjs/common';

export class DriverPeriodicInspectionNotFoundException extends HttpException {
    constructor() {
        super('Driver periodic inspection not found.', HttpStatus.NOT_FOUND);
    }
}
