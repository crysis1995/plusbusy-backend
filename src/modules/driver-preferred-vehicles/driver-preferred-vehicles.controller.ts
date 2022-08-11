import { BadRequestException, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PreferredTypeEnum } from './enums/preferred-type.enum';
import { PreferredTypeEnumValuePipe } from './pipes/preferred-type-enum-value.pipe';

@Controller('driver-preferred-vehicles')
export class DriverPreferredVehiclesController {
    @Get('all/:byType/:id')
    async getPreferredData(
        @Param('byType', PreferredTypeEnumValuePipe)
        type: PreferredTypeEnum,
        @Param('id', ParseIntPipe) id: number
    ) {
        if (!type || !id) throw new BadRequestException('Type and Id must be filled.');
    }

    @Get(':driverId/:vehicleId')
    async getById(
        @Param('driverId', ParseIntPipe) driverId: number,
        @Param('vehicleId', ParseIntPipe) vehicleId: number
    ) {}

    @Post()
    async create() {}

    @Put()
    async update() {}

    @Delete()
    async delete() {}
}
