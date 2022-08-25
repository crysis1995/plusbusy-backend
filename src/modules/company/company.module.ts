import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyController } from './controllers/company.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Company])],
    providers: [CompanyService],
    exports: [TypeOrmModule, CompanyService],
    controllers: [CompanyController]
})
export class CompanyModule {}
