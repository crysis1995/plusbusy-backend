import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const UpdateCompanyDtoSchema = z.object({
    Name: z.string().nonempty()
});

export class UpdateCompanyDto extends createZodDto(UpdateCompanyDtoSchema) {}
