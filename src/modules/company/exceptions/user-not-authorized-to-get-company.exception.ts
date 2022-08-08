import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotAuthorizedToGetCompanyException extends HttpException {
    constructor() {
        super('User not authorized to get company', HttpStatus.UNAUTHORIZED);
    }
}
