import { BuilderTemplate } from '../../../shared/shared.types';
import { z } from 'nestjs-zod/z';
import { NameSchema } from '../schemas/name.schema';
import { SurnameSchema } from '../schemas/surname.schema';
import { EmailSchema } from '../schemas/email.schema';
import { PhoneSchema } from '../schemas/phone.schema';
import { createZodDto } from 'nestjs-zod';

export const UpdateDriverDtoSchema = z.object({
    Name: NameSchema.optional(),
    Surname: SurnameSchema.optional(),
    Email: EmailSchema.optional(),
    Phone: PhoneSchema.optional()
});

export class UpdateDriverDto extends createZodDto(UpdateDriverDtoSchema) {}

export class UpdateDriverDtoBuilder extends BuilderTemplate<UpdateDriverDto> {
    constructor() {
        super(new UpdateDriverDto());
    }

    setName(value: UpdateDriverDto['Name']) {
        this.value.Name = value;
        return this;
    }

    setSurname(value: UpdateDriverDto['Surname']) {
        this.value.Surname = value;
        return this;
    }

    setPhone(value: UpdateDriverDto['Phone']) {
        this.value.Phone = value;
        return this;
    }

    setEmail(value: UpdateDriverDto['Email']) {
        this.value.Email = value;
        return this;
    }
}
