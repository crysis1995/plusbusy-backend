import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const CreateCompanySchema = z.object({
    Name: z.string().nonempty()
});

export class CreateCompanyDto extends createZodDto(CreateCompanySchema) {}
