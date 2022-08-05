import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

@Controller('company')
export class CompanyController {
    @Get('ping')
    index() {
        return 'Hello from company controller';
    }

    @Get()
    async getMy() {
        console.log('get my company');
    }

    @Get(':id')
    async getById(@Param('id',ParseIntPipe) id: number) {
        console.log(id);
    }
}
