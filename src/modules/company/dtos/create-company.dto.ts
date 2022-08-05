import { z } from "nestjs-zod/z";
import { createZodDto } from "nestjs-zod";

const CreateCompanySchema = z.object({
    Name: z.string(),
    AdminId: z.number().int()
});

export class CreateCompanyDto extends createZodDto(CreateCompanySchema) {}