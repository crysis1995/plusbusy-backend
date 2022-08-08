import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company, CompanyBuilder } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicUserDto } from '../users/dtos/basic-user.dto';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { UserHasNoAccessException } from '../users/exceptions/user-has-no-access.exception';
import { RequestData } from '../../shared/shared.types';
import { CompanyId } from './values/company-id.value';

@Injectable()
export class CompanyService {
    @InjectRepository(Company)
    private companyRepository: Repository<Company>;

    async ifUserHasAccess(
        arg1: CompanyId | RequestData,
        arg2: RequestData = undefined
    ) {
        if (arg1 instanceof CompanyId)
            return !!(await this.companyRepository.findOneBy({
                Id: arg1.value,
                AdminId: arg2.user.UserId
            }));
        else
            return !!(await this.companyRepository.findOneBy({
                Id: arg1.company.CompanyId,
                AdminId: arg1.user.UserId
            }));
    }

    async getCompanyOrNull(companyId: CompanyId, userDto: BasicUserDto) {
        return await this.companyRepository.findOneBy({
            Id: companyId.value,
            AdminId: userDto.UserId
        });
    }

    async getCompanyById(companyId: CompanyId, data: RequestData) {
        const company = this.getCompanyOrNull(companyId, data.user);
        if (!company) throw new UserHasNoAccessException();
        return company;
    }

    async getMyCompanies(data: RequestData) {
        return this.companyRepository.find({
            where: { AdminId: data.user.UserId }
        });
    }

    async createCompany(companyDto: CreateCompanyDto, data: RequestData) {
        // user cannot create company for other user
        if (companyDto.AdminId !== data.user.UserId)
            throw new UserHasNoAccessException();

        const company = new CompanyBuilder()
            .setAdmin(companyDto.AdminId)
            .setName(companyDto.Name);
        await this.companyRepository.save(companyDto);
        return company;
    }

    async updateCompany(
        companyId: CompanyId,
        updateDto: UpdateCompanyDto,
        data: RequestData
    ) {
        const hasAccess = await this.ifUserHasAccess(companyId, data);
        if (!hasAccess) throw new UserHasNoAccessException();

        await this.companyRepository.update(
            { Id: companyId.value },
            { Name: updateDto.Name }
        );
    }

    async deleteCompany(companyId: CompanyId, data: RequestData) {
        const hasAccess = await this.ifUserHasAccess(companyId, data);
        if (!hasAccess) throw new UserHasNoAccessException();

        await this.companyRepository.delete(companyId.value);
    }
}
