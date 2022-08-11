import { Request } from '@nestjs/common';
import { BasicUserDto } from '../modules/users/dtos/basic-user.dto';
import { BasicCompanyDto } from '../modules/company/dtos/basic-company.dto';
import { MyCompaniesValue } from '../modules/company/values/my-companies.value';

export class BuilderTemplate<T> {
    public value: T;
    constructor(value: T) {
        this.value = value;
    }

    build(): T {
        return this.value;
    }
}

export declare type RequestWithCompany = Request & { company: BasicCompanyDto };
export declare type RequestWithUser = Request & { user: BasicUserDto; myCompanies: BasicCompanyDto[] };
export declare type RequestWithUserAndCompany = RequestWithUser & RequestWithCompany;

export class RequestData {
    public company?: BasicCompanyDto;
    public myCompanies?: MyCompaniesValue;
    public user: BasicUserDto;
    constructor({
        user,
        company,
        myCompanies
    }: {
        user: BasicUserDto;
        company?: BasicCompanyDto;
        myCompanies: BasicCompanyDto[];
    }) {
        this.user = user;
        this.company = company;
        this.myCompanies = new MyCompaniesValue(myCompanies);
    }
}
