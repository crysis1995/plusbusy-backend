import { TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { Users, UsersBuilder } from './users.entity';
import { CreateTestingModuleUtil } from '../../../common/test-util/create-testing-module.util';

describe('test company repository', () => {
    let testingModule: TestingModule;
    let repository: Repository<Users>;
    let ds: DataSource;

    async function seedDatabase(ds: DataSource) {
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
        await ds.manager.insert(Users, [user1, user2]);
    }

    beforeAll(async () => {
        testingModule = await CreateTestingModuleUtil(Users);
        ds = testingModule.get(DataSource);
        await seedDatabase(ds);
        repository = ds.getRepository(Users);
    });

    afterAll(() => testingModule.close());

    test('should repository be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('should have properly defined users', () => {
        test('should have two users', async () => {
            const userCount = await repository.count();
            expect(userCount).toEqual(2);
        });
        test('first user should be defined properly', async () => {
            const users = await repository.findBy({ Id: 1 });

            expect(users).toHaveLength(1);
            const user = users[0];

            expect(user.Id).toEqual(1);
            expect(user.Nick).toEqual('dupaaa');
            expect(user.Email).toEqual('test@test.com');
            expect(user.IsEmailConfirmed).toEqual(true);
            expect(user.Password).toEqual('asdasd');
            expect(user.CreatedAt).toBeDefined();
            expect(user.CreatedAt).toBeInstanceOf(Date);
            expect(user.UpdatedAt).toBeDefined();
            expect(user.UpdatedAt).toBeInstanceOf(Date);
        });
        test('second user should be defined properly', async () => {
            const users = await repository.findBy({ Id: 2 });

            expect(users).toHaveLength(1);
            const user = users[0];

            expect(user.Id).toEqual(2);
            expect(user.Nick).toEqual(null);
            expect(user.Email).toEqual('aaa@aaa.com');
            expect(user.IsEmailConfirmed).toEqual(true);
            expect(user.Password).toEqual('ddasd');
            expect(user.CreatedAt).toBeDefined();
            expect(user.CreatedAt).toBeInstanceOf(Date);
            expect(user.UpdatedAt).toBeDefined();
            expect(user.UpdatedAt).toBeInstanceOf(Date);
        });
    });
});
