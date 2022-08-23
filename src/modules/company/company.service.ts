import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company, CompanyBuilder } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicUserDto } from '../users/dtos/basic-user.dto';
import { CreateCompanyDto, CreateCompanySchema } from './dtos/create-company.dto';
import { UpdateCompanyDto, UpdateCompanyDtoSchema } from './dtos/update-company.dto';
import { UserHasNoAccessException } from '../users/exceptions/user-has-no-access.exception';
import { RequestData } from '../../shared/shared.types';
import { CompanyId } from './values/company-id.value';
import { SchemaValidator } from '../../shared/shared.validator';

@Injectable()
export class CompanyService {
    @InjectRepository(Company)
    private companyRepository: Repository<Company>;

    async getCompanyOrNull(companyId: CompanyId, userDto: BasicUserDto) {
        return await this.companyRepository.findOneBy({
            Id: companyId.value,
            AdminId: userDto.UserId
        });
    }

    async getById(companyId: CompanyId, data: RequestData) {
        const company = this.getCompanyOrNull(companyId, data.user);
        if (!company) throw new UserHasNoAccessException();
        return company;
    }

    async getAll(data: RequestData) {
        return this.companyRepository.find({
            where: { AdminId: data.user.UserId }
        });
    }

    async create(companyDto: CreateCompanyDto, data: RequestData) {
        new SchemaValidator(CreateCompanySchema).validate(companyDto);

        const company = new CompanyBuilder().setAdmin(data.user.UserId).setName(companyDto.Name).build();
        await this.companyRepository.save(company);
        return company;
    }

    async update(companyId: CompanyId, updateDto: UpdateCompanyDto, data: RequestData) {
        const hasAccess = data.myCompanies.isContainCompany(companyId.value);
        if (!hasAccess) throw new UserHasNoAccessException();

        new SchemaValidator(UpdateCompanyDtoSchema).validate(updateDto);

        await this.companyRepository.update({ Id: companyId.value }, { Name: updateDto.Name });
    }

    async delete(companyId: CompanyId, data: RequestData) {
        const hasAccess = data.myCompanies.isContainCompany(companyId.value);
        if (!hasAccess) throw new UserHasNoAccessException();

        await this.companyRepository.delete(companyId.value);
    }
}
