import { Module } from '@nestjs/common';
import { CompanySettingsService } from './services/company-settings.service';
import { CompanySettingsController } from './controllers/company-settings.controller';

@Module({
    providers: [CompanySettingsService],
    controllers: [CompanySettingsController]
})
export class CompanySettingsModule {}
