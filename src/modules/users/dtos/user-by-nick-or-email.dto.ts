import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { BuilderTemplate } from '../../../shared/shared.types';
import { Users } from '../entities/users.entity';

export const EmailSchema = z.string().email();
export const NickSchema = z.string();

export const UserByNickOrEmailSchema = z.object({
    UserName: EmailSchema.or(NickSchema)
});

export class UserByNickOrEmailDto extends createZodDto(UserByNickOrEmailSchema) {}

export class UserByNickOrEmailDtoBuilder extends BuilderTemplate<UserByNickOrEmailDto> {
    constructor() {
        super(new UserByNickOrEmailDto());
    }
    setUsername(value: Users['Email']) {
        if (EmailSchema.safeParse(value).success) {
            this.value.UserName = value;
        } else if (NickSchema.safeParse(value).success) {
            this.value.UserName = value;
        }
        return this;
    }
}
