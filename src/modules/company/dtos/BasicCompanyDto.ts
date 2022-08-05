import { Company } from '../entities/company.entity';

export class BasicCompanyDto {
    constructor(public Id: Company['Id']) {}
}
