import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Company } from '../../src/modules/company/entities/company.entity';
import { Users } from '../../src/modules/users/entities/users.entity';
import { DataSourceOptions } from 'typeorm';

const entities = [Company, Users];

export const getConnections = (): DataSourceOptions => ({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities,
    synchronize: true
});

export const TypeOrmSQLITETestingModule = () => [

];
