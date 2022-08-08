import { HttpException, HttpStatus } from '@nestjs/common';
import { UserByNickOrEmailDto } from '../dtos/user-by-nick-or-email.dto';

export class UserBadDataException extends HttpException {
    constructor(private value: UserByNickOrEmailDto) {
        super(`Can't find username: ${value.UserName}`, HttpStatus.NOT_FOUND);
    }
}
