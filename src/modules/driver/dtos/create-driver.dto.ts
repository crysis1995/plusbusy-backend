import { BuilderTemplate } from '../../../shared/shared.types';
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { NameSchema } from '../schemas/name.schema';
import { SurnameSchema } from '../schemas/surname.schema';
import { EmailSchema } from '../schemas/email.schema';
import { PhoneSchema } from '../schemas/phone.schema';

export const CreateDriverDtoScheme = z
    .object({
        Name: NameSchema,
        Surname: SurnameSchema,
        Email: EmailSchema.optional(),
        Phone: PhoneSchema.optional()
    })
    .refine((a) => !(!a.Email && !a.Phone), { message: 'At least Email or Phone are required' });

export class CreateDriverDto extends createZodDto(CreateDriverDtoScheme) {}

export class CreateDriverDtoBuilder extends BuilderTemplate<CreateDriverDto> {
    constructor() {
        super(new CreateDriverDto());
    }

    setName(value: CreateDriverDto['Name']) {
        this.value.Name = value;
        return this;
    }

    setSurname(value: CreateDriverDto['Surname']) {
        this.value.Surname = value;
        return this;
    }

    setPhone(value: CreateDriverDto['Phone']) {
        this.value.Phone = value;
        return this;
    }

    setEmail(value: CreateDriverDto['Email']) {
        this.value.Email = value;
        return this;
    }
}
