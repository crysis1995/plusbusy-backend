import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "./company.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Company])],
  providers: [CompanyService],
  exports:[TypeOrmModule]
})
export class CompanyModule {}
