import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company settings')
@Controller('company-settings')
export class CompanySettingsController {}
