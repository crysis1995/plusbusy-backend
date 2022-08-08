import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    Request
} from '@nestjs/common';
import { CompanyService } from '../company.service';
import { z } from 'nestjs-zod/z';
import { BasicCompanyDto } from '../dtos/basic-company.dto';
import { BasicUserDto } from '../../users/dtos/basic-user.dto';
import { UserHasNoAccessException } from '../../users/exceptions/user-has-no-access.exception';

type RequestWithUserAndCompany = Request & {
    company: BasicCompanyDto;
    user: BasicUserDto;
};

@Injectable()
export class CompanyGuard implements CanActivate {
    @Inject(CompanyService)
    private companyService: CompanyService;

    canActivate(context: ExecutionContext) {
        const req = context
            .switchToHttp()
            .getRequest<RequestWithUserAndCompany>();
        return this.validateRequest(req);
    }

    async validateRequest(req: RequestWithUserAndCompany) {
        req.company = null;
        const companyIdHeaderKey = 'company-id';
        if (companyIdHeaderKey in req.headers) {
            const companyIdValue = req.headers[companyIdHeaderKey];
            const data = z.string().uuid().safeParse(companyIdValue);
            if (data.success) {
                const companyDto = new BasicCompanyDto(companyIdValue);
                const company = await this.companyService.getCompanyOrNull(
                    companyDto,
                    req.user
                );
                /*
                 *   If company is null, we want to pass user has no access, because we don't
                 *   suggest user to try looking for, by brutal force method, company ID in database
                 * */
                if (company && company.AdminId === req.user.UserId) {
                    req.company = companyDto;
                } else throw new UserHasNoAccessException();
            }
        }
        return true;
    }
}
