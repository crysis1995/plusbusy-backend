import { TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { Vehicle, VehicleBuilder } from './vehicle.entity';
import { CreateTestingModuleUtil } from '../../../common/test-util/create-testing-module.util';
import { Company, CompanyBuilder } from '../../company/entities/company.entity';
import { Users, UsersBuilder } from '../../users/entities/users.entity';

describe('test company repository', () => {
    let testingModule: TestingModule;
    let repository: Repository<Vehicle>;
    let ds: DataSource;

    async function seedDatabase(ds: DataSource) {
        const user1 = new UsersBuilder()
            .setId(1)
            .setEmail('asd@asd.com')
            .setIsEmailConfirmed(false)
            .setPassword('krzys19950')
            .build();
        const user2 = new UsersBuilder()
            .setId(2)
            .setPassword('krzys19950')
            .setEmail('asdasd@asdasd.com')
            .setIsEmailConfirmed(true)
            .build();
        await ds.manager.insert(Users, [user1, user2]);

        const company1 = new CompanyBuilder()
            .setId('b16065f6-dfbe-4845-b1a3-7e5156d4b562')
            .setName('Test')
            .setAdmin(1)
            .build();

        const company2 = new CompanyBuilder()
            .setId('6c684cfd-6421-4131-936f-04c73ab10e76')
            .setAdmin(2)
            .setName('test test')
            .build();
        await ds.manager.insert(Company, [company1, company2]);

        const vehicle1 = new VehicleBuilder()
            .setId(1)
            .setCompany('b16065f6-dfbe-4845-b1a3-7e5156d4b562')
            .setSeatsCount(40)
            .setPlates('TKI30KU')
            .setShortName('Szybki pojazd')
            .build();

        const vehicle2 = new VehicleBuilder()
            .setId(2)
            .setCompany('6c684cfd-6421-4131-936f-04c73ab10e76')
            .setSeatsCount(50)
            .setShortName('skoda')
            .setPlates('WW00012')
            .build();
        await ds.manager.insert(Vehicle, [vehicle1, vehicle2]);
    }

    beforeAll(async () => {
        testingModule = await CreateTestingModuleUtil(Users, Company, Vehicle);
        ds = testingModule.get(DataSource);
        await seedDatabase(ds);
        repository = ds.getRepository(Vehicle);
    });

    afterAll(() => testingModule.close());

    describe('should have properly vehicle defined', () => {
        test('should have two vehicles', async () => {
            const vehicleCount = await repository.count();
            expect(vehicleCount).toEqual(2);
        });
        test('should have first vehicle defined properly', async () => {
            const vehicles = await repository.findBy({ Id: 1 });
            expect(vehicles).toHaveLength(1);

            const vehicle = vehicles[0];
            expect(vehicle.Id).toEqual(1);
            expect(vehicle.CompanyId).toEqual('b16065f6-dfbe-4845-b1a3-7e5156d4b562');
            expect(vehicle.SeatsCount).toEqual(40);
            expect(vehicle.Plates).toEqual('TKI30KU');
            expect(vehicle.ShortName).toEqual('Szybki pojazd');
            expect(vehicle.CreatedAt).toBeDefined();
            expect(vehicle.UpdatedAt).toBeDefined();
        });
        test('should have second vehicle defined properly', async () => {
            const vehicles = await repository.findBy({ Id: 2 });
            expect(vehicles).toHaveLength(1);

            const vehicle = vehicles[0];
            expect(vehicle.Id).toEqual(2);
            expect(vehicle.CompanyId).toEqual('6c684cfd-6421-4131-936f-04c73ab10e76');
            expect(vehicle.SeatsCount).toEqual(50);
            expect(vehicle.Plates).toEqual('WW00012');
            expect(vehicle.ShortName).toEqual('skoda');
            expect(vehicle.CreatedAt).toBeDefined();
            expect(vehicle.UpdatedAt).toBeDefined();
        });
    });

    test('should create vehicle properly', async () => {
        const vehicle = new VehicleBuilder()
            .setCompany('6c684cfd-6421-4131-936f-04c73ab10e76')
            .setSeatsCount(10)
            .setPlates('DSA3123')
            .setShortName('TEST')
            .build();

        const storedVehicle = await repository.save(vehicle);

        expect(storedVehicle.Id).toBeDefined();
        expect(storedVehicle.Plates).toEqual(vehicle.Plates);
        expect(storedVehicle.ShortName).toEqual(vehicle.ShortName);
        expect(storedVehicle.SeatsCount).toEqual(vehicle.SeatsCount);
        expect(storedVehicle.CompanyId).toEqual(vehicle.CompanyId);
        expect(storedVehicle.CreatedAt).toBeDefined();
        expect(storedVehicle.UpdatedAt).toBeDefined();
    });

    test('should update vehicle properly', async () => {
        const Id = 2;
        const vehicle = await repository.findOneBy({ Id });

        const vehicleToUpdate = new VehicleBuilder()
            .setId(Id)
            .setShortName('new name')
            .setSeatsCount(44)
            .setPlates('412311')
            .setCompany('b16065f6-dfbe-4845-b1a3-7e5156d4b562')
            .build();

        await repository.update(Id, vehicleToUpdate);
        const updated = await repository.findOneBy({ Id });

        expect(updated.Id).toEqual(vehicleToUpdate.Id);
        expect(updated.Plates).toEqual(vehicleToUpdate.Plates);
        expect(updated.ShortName).toEqual(vehicleToUpdate.ShortName);
        expect(updated.SeatsCount).toEqual(vehicleToUpdate.SeatsCount);
        expect(updated.CompanyId).toEqual(vehicleToUpdate.CompanyId);
        expect(updated.CreatedAt).toBeDefined();
        expect(updated.UpdatedAt).toBeDefined();
    });

    test('should delete existing vehicle', async () => {
        const Id = 2;
        await repository.delete(Id);
        const vehicle = await repository.findOneBy({ Id });

        expect(vehicle).toBeFalsy();
    });
});
