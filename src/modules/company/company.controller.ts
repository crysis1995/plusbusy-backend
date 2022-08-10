import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Request,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestData, RequestWithUser } from '../../shared/shared.types';
import { CompanyService } from './company.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto, CreateCompanySchema } from './dtos/create-company.dto';
import { UpdateCompanyDto, UpdateCompanyDtoSchema } from './dtos/update-company.dto';
import { CompanyId } from './values/company-id.value';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

@ApiTags('Company')
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
    @Inject(CompanyService)
    private companyService: CompanyService;

    @Get('ping')
    index() {
        return 'Hello from company controller';
    }

    @Get()
    async getMyCompanies(@Request() req: RequestWithUser) {
        return await this.companyService.getMyCompanies(new RequestData(req));
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string, @Request() req: RequestWithUser) {
        return await this.companyService.getCompanyById(new CompanyId(id), new RequestData(req));
    }

    @Post()
    async createCompany(
        @Body(new ValidationPipe(CreateCompanySchema)) dto: CreateCompanyDto,
        @Request() req: RequestWithUser
    ) {
        return await this.companyService.createCompany(dto, new RequestData(req));
    }

    @Put(':id')
    async updateCompany(
        @Param('id', ParseUUIDPipe) id,
        @Body(new ValidationPipe(UpdateCompanyDtoSchema)) dto: UpdateCompanyDto,
        @Request() req: RequestWithUser
    ) {
        return await this.companyService.updateCompany(new CompanyId(id), dto, new RequestData(req));
    }

    @Delete(':id')
    async deleteCompany(@Param('id', ParseUUIDPipe) id: string, @Request() req: RequestWithUser) {
        return await this.companyService.deleteCompany(new CompanyId(id), new RequestData(req));
    }
}
