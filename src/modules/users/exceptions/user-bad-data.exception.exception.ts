import { CustomException } from '../../../shared/shared.exception';
import { EmailSchema, NickSchema, UserByNickOrEmailDto } from '../dtos/user-by-nick-or-email.dto';
import { HttpStatus } from '@nestjs/common';

export class UserBadDataExceptionException extends CustomException<UserByNickOrEmailDto> {
    constructor(val:UserByNickOrEmailDto) {
        super(val);
    }

    getEmailOrNick() {
        let message = '';
        if (EmailSchema.safeParse(this.Object.UserName).success) {
            message += `\tEmail:${this.Object.UserName}`;
        }
        if (NickSchema.safeParse(this.Object.UserName).success) {
            message += `\tNick:${this.Object.UserName}`;
        }

        return message;
    }

    custom_message = `Cannot found user with ${this.getEmailOrNick()}`;
    custom_status = HttpStatus.NOT_FOUND;
}
