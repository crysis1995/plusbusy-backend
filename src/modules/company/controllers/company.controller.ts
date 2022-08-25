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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RequestData, RequestWithUser } from '../../../shared/shared.types';
import { CompanyService } from '../services/company.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.dto';
import { CompanyId } from '../values/company-id.value';

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
        return await this.companyService.getAll(new RequestData(req));
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string, @Request() req: RequestWithUser) {
        return await this.companyService.getById(new CompanyId(id), new RequestData(req));
    }

    @Post()
    async createCompany(@Body() dto: CreateCompanyDto, @Request() req: RequestWithUser) {
        return await this.companyService.create(dto, new RequestData(req));
    }

    @Put(':id')
    async updateCompany(
        @Param('id', ParseUUIDPipe) id,
        @Body() dto: UpdateCompanyDto,
        @Request() req: RequestWithUser
    ) {
        return await this.companyService.update(new CompanyId(id), dto, new RequestData(req));
    }

    @Delete(':id')
    async deleteCompany(@Param('id', ParseUUIDPipe) id: string, @Request() req: RequestWithUser) {
        return await this.companyService.delete(new CompanyId(id), new RequestData(req));
    }
}
