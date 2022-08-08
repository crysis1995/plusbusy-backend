import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Company } from '../../../../src/modules/company/entities/company.entity';
import { DataSource, Repository } from 'typeorm';
import { DatabaseSeed } from '../../../utils/database.seed';
import {
    getConnections,
    TypeOrmSQLITETestingModule
} from '../../../utils/type-orm-testing-module';

describe('Test company entity', () => {
    let testingModule: TestingModule;
    let repository: Repository<Company>;
    beforeAll(async () => {
        testingModule = await Test.createTestingModule({
            imports: TypeOrmSQLITETestingModule()
        }).compile();

        repository = testingModule.get<Repository<Company>>(
            getRepositoryToken(Company)
        );

        await DatabaseSeed(new DataSource(getConnections()));
    });

    afterAll(() => {
        testingModule.close();
    });

    test('should has sth in database', async () => {
        const data = await repository.find();

        expect(data).toHaveLength(1);
    });
});
