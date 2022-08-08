import { HttpException, HttpStatus } from '@nestjs/common';

export class UserHasNoAccessException extends HttpException {
    constructor() {
        super('User has no access to requested data', HttpStatus.FORBIDDEN);
    }
}
