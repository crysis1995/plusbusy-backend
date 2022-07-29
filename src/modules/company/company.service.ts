import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { BuilderTemplate } from "../../shared/shared.types";

@Injectable()
export class CompanyService {
    @InjectRepository(Company)
    private companyRepository: Repository<Company>;

    async getCompanyById(Id: Company['Id']) {
        return this.companyRepository.findOneBy({ Id });
    }

    async getMyCompanies(AdminId: Users['Id']) {
        return this.companyRepository.find({ where: { AdminId } });
    }

    async createCompany(){

    }

    async updateCompany(){

    }

    async deleteCompany(){

    }
}


