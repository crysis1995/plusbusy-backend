import { BuilderTemplate } from '../../../shared/shared.types';
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import { UserType } from '../entities/users.entity';

export const CreateUserSchema = z.object({
    Email: z.string().email(),
    Password: z.string(),
    Nick: z.string().optional()
});
export class CreateUserDto extends createZodDto(CreateUserSchema) {}

export class CreateUserDtoBuilder extends BuilderTemplate<CreateUserDto> {
    constructor() {
        super(new CreateUserDto());
    }

    setEmail(value: UserType['Email']) {
        this.value.Email = value;
        return this;
    }
    setPassword(value: UserType['Password']) {
        this.value.Password = value;
        return this;
    }
    setNick(value: UserType['Nick']) {
        this.value.Nick = value;
        return this;
    }
}
