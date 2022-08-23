import { CreateTestingModuleUtil } from '../../../common/test-util/create-testing-module.util';
import { Company, CompanyBuilder } from './company.entity';
import { Users, UsersBuilder } from '../../users/entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { TestingModule } from '@nestjs/testing';

describe('test company repository', () => {
    let testingModule: TestingModule;
    let repository: Repository<Company>;
    let ds: DataSource;

    async function seedDatabase(ds: DataSource) {
        const manager = ds.manager;
        const user1 = new UsersBuilder()
            .setId(1)
            .setIsEmailConfirmed(true)
            .setEmail('test@test.com')
            .setPassword('asdasd')
            .setNick('dupaaa')
            .build();
        const user2 = new UsersBuilder()
            .setId(2)
            .setIsEmailConfirmed(true)
            .setEmail('aaa@aaa.com')
            .setPassword('ddasd')
            .build();
        await manager.insert(Users, [user1, user2]);

        const company1 = new CompanyBuilder()
            .setId('fb518862-12e3-4f3a-b0ea-43c08f1a48ce')
            .setAdmin(1)
            .setName('Test name')
            .build();
        const company2 = new CompanyBuilder()
            .setId('a0a89963-bdfb-4be4-82f7-133a961440ca')
            .setAdmin(2)
            .setName('Another name')
            .build();

        await manager.insert(Company, [company1, company2]);
    }

    beforeAll(async () => {
        testingModule = await CreateTestingModuleUtil(Company, Users);
        ds = testingModule.get(DataSource);
        await seedDatabase(ds);
        repository = ds.getRepository(Company);
    });

    afterAll(() => testingModule.close());

    test('should repository be defined', () => {
        expect(repository).toBeDefined();
    });
    describe('should have properly defined companies', () => {
        test('should have two companies', async () => {
            const companies = await repository.find();
            expect(companies).toHaveLength(2);
        });
        test('first company should be one and defined properly', async () => {
            const companies = await repository.find({
                where: { Id: 'fb518862-12e3-4f3a-b0ea-43c08f1a48ce' },
                relations: ['Admin']
            });
            const company = companies[0];

            expect(companies).toHaveLength(1);

            expect(company.Id).toEqual('fb518862-12e3-4f3a-b0ea-43c08f1a48ce');
            expect(company.AdminId).toEqual(1);
            expect(company.Name).toEqual('Test name');
            expect(company.CreatedAt).toBeDefined();
            expect(company.UpdatedAt).toBeDefined();
            expect(company.CreatedAt).toBeInstanceOf(Date);
            expect(company.UpdatedAt).toBeInstanceOf(Date);
            expect(company.Admin).toBeInstanceOf(Users);
            expect(company.Admin.Id).toEqual(1);
        });
        test('second company should be one and defined properly', async () => {
            const Id = 'a0a89963-bdfb-4be4-82f7-133a961440ca';
            const companies = await repository.find({
                where: { Id },
                relations: ['Admin']
            });
            const company = companies[0];

            expect(companies).toHaveLength(1);

            expect(company.Id).toEqual(Id);
            expect(company.AdminId).toEqual(2);
            expect(company.Name).toEqual('Another name');
            expect(company.CreatedAt).toBeDefined();
            expect(company.UpdatedAt).toBeDefined();
            expect(company.CreatedAt).toBeInstanceOf(Date);
            expect(company.UpdatedAt).toBeInstanceOf(Date);
            expect(company.Admin).toBeInstanceOf(Users);
            expect(company.Admin.Id).toEqual(2);
        });
    });

    test('should create company properly', async () => {
        const company = new CompanyBuilder().setName('Plusbusy').setAdmin(2).build();

        const storedCompany = await repository.save(company);

        const companiesCount = await repository.count();
        expect(companiesCount).toEqual(3);

        expect(storedCompany.Id).toBeDefined();
        expect(storedCompany.Name).toEqual(company.Name);
        expect(storedCompany.AdminId).toEqual(company.AdminId);
        expect(storedCompany.CreatedAt).toBeDefined();
        expect(storedCompany.UpdatedAt).toBeDefined();
        expect(storedCompany.CreatedAt).toBeInstanceOf(Date);
        expect(storedCompany.UpdatedAt).toBeInstanceOf(Date);
    });

    test('should update existing company properly', async () => {
        const Id = 'fb518862-12e3-4f3a-b0ea-43c08f1a48ce';
        const company = await repository.findOne({
            where: { Id }
        });

        const companyToUpdate = new CompanyBuilder()
            .setId(Id)
            .setName('Plusbusy z dopiskiem')
            .build();

        await repository.update(Id, companyToUpdate);

        const updatedCompany = await repository.findOneBy({ Id });

        expect(updatedCompany.Id).toEqual(company.Id);
        expect(updatedCompany.AdminId).toEqual(company.AdminId);
        expect(updatedCompany.CreatedAt).toEqual(company.CreatedAt);

        expect(updatedCompany.Name).not.toEqual(company.Name);
        expect(updatedCompany.Name).toEqual('Plusbusy z dopiskiem');
    });

    test('should delete existing company', async () => {
        const Id = 'fb518862-12e3-4f3a-b0ea-43c08f1a48ce';

        await repository.delete(Id);

        const company = await repository.findOne({
            where: { Id }
        });

        expect(company).toBeFalsy();
    });
});
