import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotAuthorizedToCreateCompanyException extends HttpException {
    constructor() {
        super('User not authorized to create company', HttpStatus.UNAUTHORIZED);
    }
}
