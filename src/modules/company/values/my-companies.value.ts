import { BasicCompanyDto } from '../dtos/basic-company.dto';
import { Company } from '../entities/company.entity';

export class MyCompaniesValue {
    constructor(private companies: BasicCompanyDto[]) {}

    isContainCompany(companyId: Company['Id']) {
        return this.companies.some((x) => x.CompanyId === companyId);
    }

    getIds() {
        return this.companies.map((x) => x.CompanyId);
    }
}
