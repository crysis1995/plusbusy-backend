import { CanActivate, ExecutionContext, Inject, Injectable, Request } from '@nestjs/common';
import { CompanyService } from '../company.service';
import { z } from 'nestjs-zod/z';
import { BasicCompanyDto } from '../dtos/BasicCompanyDto';
import { BasicUserDto } from '../../users/dtos/basic-user.dto';
import { RequestDoesNotContainCompanyInfo } from '../exceptions/request-does-not-contain-company-info';
import { CompanyMustBeAnUuidException } from '../../users/exceptions/company-must-be-an-uuid.exception';
import { UserHasNotAccessToCompanyException } from '../../users/exceptions/user-has-not-access-to-company.exception';

type RequestWithUserAndCompany = Request & { company: BasicCompanyDto; user: BasicUserDto };

@Injectable()
export class CompanyGuard implements CanActivate {
    @Inject(CompanyService)
    private companyService: CompanyService;

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<RequestWithUserAndCompany>();
        return this.validateRequest(req);
    }

    async validateRequest(req: RequestWithUserAndCompany) {
        const companyIdHeaderKey = 'company-id';
        if (!(companyIdHeaderKey in req.headers)) throw new RequestDoesNotContainCompanyInfo();

        const companyIdValue = req.headers[companyIdHeaderKey];
        if (!z.string().uuid().safeParse(companyIdValue).success) throw new CompanyMustBeAnUuidException();

        const company = await this.companyService.getCompanyById(companyIdValue);
        if (!company || company.AdminId !== req.user.UserId) throw new UserHasNotAccessToCompanyException();

        req.company = new BasicCompanyDto(companyIdValue);
        return true;
    }
}
