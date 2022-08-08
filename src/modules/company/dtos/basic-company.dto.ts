import { Company } from '../entities/company.entity';
import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const BasicCompanyDtoScheme = z.object({
    CompanyId: z.string().uuid()
});

export class BasicCompanyDto extends createZodDto(BasicCompanyDtoScheme) {
    constructor(CompanyId: Company['Id']) {
        super();
        this.CompanyId = CompanyId;
    }
}
