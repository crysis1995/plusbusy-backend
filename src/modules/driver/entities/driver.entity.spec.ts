import { TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { CreateTestingModuleUtil } from '../../../common/test-util/create-testing-module.util';
import { Driver, DriverBuilder } from './driver.entity';

describe('test company repository', () => {
    let testingModule: TestingModule;
    let repository: Repository<Driver>;
    let ds: DataSource;

    async function seedDatabase(ds: DataSource) {
        const driver1 = new DriverBuilder()
            .setId(1)
            .setEmail('asd@ad.com')
            .setIsEmailConfirmed(true)
            .setName('Jan')
            .setSurname('Kowalski')
            .setPhone('123123123')
            .setIsPhoneConfirmed(false)
            .build();
        const driver2 = new DriverBuilder().setId(2).setName('Adam').setSurname('Nowak').build();
        await ds.manager.insert(Driver, [driver1, driver2]);
    }

    beforeAll(async () => {
        testingModule = await CreateTestingModuleUtil(Driver);
        ds = testingModule.get(DataSource);
        await seedDatabase(ds);
        repository = ds.getRepository(Driver);
    });

    afterAll(() => testingModule.close());

    describe('should have properly defined drivers', () => {
        test('should have two drivers', async () => {
            const drivers = await repository.count();
            expect(drivers).toEqual(2);
        });
        test('should have first driver properly defined', async () => {
            const drivers = await repository.findBy({ Id: 1 });

            expect(drivers).toHaveLength(1);
            const driver = drivers[0];

            expect(driver.Id).toEqual(1);
            expect(driver.Name).toEqual('Jan');
            expect(driver.Surname).toEqual('Kowalski');
            expect(driver.Phone).toEqual('123123123');
            expect(driver.Email).toEqual('asd@ad.com');
            expect(driver.IsPhoneConfirmed).toEqual(false);
            expect(driver.IsEmailConfirmed).toEqual(true);
            expect(driver.CreatedAt).toBeDefined();
            expect(driver.UpdatedAt).toBeDefined();
        });
        test('should have second driver properly defined', async () => {
            const drivers = await repository.findBy({ Id: 2 });

            expect(drivers).toHaveLength(1);
            const driver = drivers[0];

            expect(driver.Id).toEqual(2);
            expect(driver.Name).toEqual('Adam');
            expect(driver.Surname).toEqual('Nowak');
            expect(driver.Phone).toEqual(null);
            expect(driver.Email).toEqual(null);
            expect(driver.IsPhoneConfirmed).toEqual(false);
            expect(driver.IsEmailConfirmed).toEqual(false);
            expect(driver.CreatedAt).toBeDefined();
            expect(driver.UpdatedAt).toBeDefined();
        });
    });

    test('should create driver properly', async () => {
        const driver = new DriverBuilder()
            .setName('Krzysztof')
            .setSurname('Kaczor')
            .setEmail('krzysztofkaczor95@gmail.com')
            .build();

        const storedDriver = await repository.save(driver);

        expect(storedDriver.Id).toBeDefined();
        expect(storedDriver.Name).toEqual('Krzysztof');
        expect(storedDriver.Surname).toEqual('Kaczor');
        expect(storedDriver.Email).toEqual('krzysztofkaczor95@gmail.com');
        expect(storedDriver.Phone).toEqual(null);
        expect(storedDriver.IsPhoneConfirmed).toEqual(false);
        expect(storedDriver.IsEmailConfirmed).toEqual(false);
        expect(storedDriver.CreatedAt).toBeDefined();
        expect(storedDriver.UpdatedAt).toBeDefined();
    });

    test('should update properly', async () => {
        const Id = 2;
        const driver = await repository.findOneBy({ Id });

        const driverToUpdate = new DriverBuilder()
            .setId(Id)
            .setPhone('123123123')
            .setEmail('krzysztof@kaczor.com')
            .setIsPhoneConfirmed(true)
            .setIsEmailConfirmed(true)
            .build();

        await repository.update(Id, driverToUpdate);

        const updated = await repository.findOneBy({ Id });

        expect(updated.Id).toEqual(driver.Id);
        expect(updated.Name).toEqual(driver.Name);
        expect(updated.Surname).toEqual(driver.Surname);
        expect(updated.Email).toEqual('krzysztof@kaczor.com');
        expect(updated.Phone).toEqual('123123123');
        expect(updated.IsPhoneConfirmed).toEqual(true);
        expect(updated.IsEmailConfirmed).toEqual(true);
        expect(updated.CreatedAt).toBeDefined();
        expect(updated.UpdatedAt).toBeDefined();
    });

    test('should delete existing company', async () => {
        const Id = 2;

        await repository.delete(Id);
        const driver = await repository.findOne({
            where: { Id }
        });

        expect(driver).toBeFalsy();
    });
});
