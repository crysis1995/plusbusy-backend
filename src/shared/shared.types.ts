import { Request } from '@nestjs/common';
import { BasicUserDto } from '../modules/users/dtos/basic-user.dto';
import { BasicCompanyDto } from '../modules/company/dtos/basic-company.dto';

export class BuilderTemplate<T> {
    public value: T;
    constructor(value: T) {
        this.value = value;
    }

    build(): T {
        return this.value;
    }
}

export declare type RequestWithUser = Request & { user: BasicUserDto };
export declare type RequestWithCompany = Request & { company: BasicCompanyDto };
export declare type RequestWithUserAndCompany = RequestWithUser &
    RequestWithCompany;

export class RequestData {
    public company?: BasicCompanyDto;
    public user: BasicUserDto;
    constructor({
        user,
        company
    }: {
        user: BasicUserDto;
        company?: BasicCompanyDto;
    }) {
        this.user = user;
        this.company = company;
    }
}
