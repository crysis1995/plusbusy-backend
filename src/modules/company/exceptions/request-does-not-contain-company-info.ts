import { HttpException, HttpStatus } from '@nestjs/common';

export class RequestDoesNotContainCompanyInfo extends HttpException {
    constructor() {
        super('Request does not contain any company.', HttpStatus.BAD_REQUEST);
    }
}
