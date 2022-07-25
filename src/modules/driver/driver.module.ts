import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Driver } from "./driver.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Driver])],
    exports: [TypeOrmModule]
})
export class DriverModule {}