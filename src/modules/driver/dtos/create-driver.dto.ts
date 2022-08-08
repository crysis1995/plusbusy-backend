import { BuilderTemplate } from '../../../shared/shared.types';
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const CreateDriverDtoWithEmail = z.object({
    Name: z.string(),
    Surname: z.string(),
    Email: z.string(),
    Phone: z.string().optional()
});

const CreateDriverDtoWithPhone = z.object({
    Name: z.string(),
    Surname: z.string(),
    Email: z.string().optional(),
    Phone: z.string()
});

const CreateDriverDtoScheme = CreateDriverDtoWithPhone.merge(
    CreateDriverDtoWithEmail
);

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
