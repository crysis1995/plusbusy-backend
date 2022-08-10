import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotAuthorizedException extends HttpException {
    constructor(message: string = '') {
        super('User not authorized!' + (message && ' ' + message), HttpStatus.UNAUTHORIZED);
    }
}
