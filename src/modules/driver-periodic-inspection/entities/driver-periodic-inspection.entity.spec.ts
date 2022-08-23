import { TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { Driver, DriverBuilder } from '../../driver/entities/driver.entity';
import { CreateTestingModuleUtil } from '../../../common/test-util/create-testing-module.util';
import {
    DriverPeriodicInspection,
    DriverPeriodicInspectionBuilder
} from './driver-periodic-inspection.entity';
import { DriverPeriodicInspectionDocumentTypeEnum } from '../enums/driver-periodic-inspection-document-type.enum';

describe('test company repository', () => {
    let testingModule: TestingModule;
    let repository: Repository<DriverPeriodicInspection>;
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

        const driverInspection1 = new DriverPeriodicInspectionBuilder()
            .setDriver(1)
            .setDocumentType(DriverPeriodicInspectionDocumentTypeEnum.DRIVING_LICENSE)
            .setNote('notatka')
            .setFromDate(new Date('2020-01-01'))
            .setToDate(new Date('2020-10-01'))
            .build();

        const driverInspection2 = new DriverPeriodicInspectionBuilder()
            .setDriver(2)
            .setDocumentType(DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION)
            .setNote('notatka2')
            .setFromDate(new Date('2020-01-01'))
            .setToDate(new Date('2020-10-01'))
            .build();

        await ds.manager.insert(DriverPeriodicInspection, [driverInspection1, driverInspection2]);
    }

    beforeAll(async () => {
        testingModule = await CreateTestingModuleUtil(Driver, DriverPeriodicInspection);
        ds = testingModule.get(DataSource);
        await seedDatabase(ds);
        repository = ds.getRepository(DriverPeriodicInspection);
    });

    afterAll(() => testingModule.close());

    describe('should have properly defined driver periodic inspections', () => {
        test('should have two Driver Periodic Inspections', async () => {
            const inspectionsCount = await repository.count();
            expect(inspectionsCount).toEqual(2);
        });

        test('should have first inspection properly defined', async () => {
            const inspections = await repository.find({
                where: {
                    DriverId: 1,
                    FromDate: '2020-01-01',
                    ToDate: '2020-10-01',
                    DocumentType: DriverPeriodicInspectionDocumentTypeEnum.DRIVING_LICENSE
                }
            });

            expect(inspections).toHaveLength(1);
            const inspection = inspections[0];

            expect(inspection.DriverId).toEqual(1);
            expect(inspection.DocumentType).toEqual(
                DriverPeriodicInspectionDocumentTypeEnum.DRIVING_LICENSE
            );
            expect(inspection.FromDate).toEqual('2020-01-01');
            expect(inspection.ToDate).toEqual('2020-10-01');
            expect(inspection.Note).toEqual('notatka');
            expect(inspection.CreatedAt).toBeDefined();
            expect(inspection.UpdatedAt).toBeDefined();
        });

        test('should have second inspection properly defined', async () => {
            const inspections = await repository.find({
                where: {
                    DriverId: 2,
                    FromDate: '2020-01-01',
                    ToDate: '2020-10-01',
                    DocumentType: DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
                }
            });

            expect(inspections).toHaveLength(1);
            const inspection = inspections[0];

            expect(inspection.DriverId).toEqual(2);
            expect(inspection.DocumentType).toEqual(
                DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
            );
            expect(inspection.FromDate).toEqual('2020-01-01');
            expect(inspection.ToDate).toEqual('2020-10-01');
            expect(inspection.Note).toEqual('notatka2');
            expect(inspection.CreatedAt).toBeDefined();
            expect(inspection.UpdatedAt).toBeDefined();
        });
    });

    test('should create driver inspection properly', async () => {
        const driverPeriodicInspection = new DriverPeriodicInspectionBuilder()
            .setDriver(1)
            .setDocumentType(DriverPeriodicInspectionDocumentTypeEnum.DRIVING_LICENSE)
            .setFromDate('2022-01-01')
            .setToDate('2022-10-29')
            .build();

        const storedDriver = await repository.save(driverPeriodicInspection);
        expect(storedDriver.DriverId).toEqual(driverPeriodicInspection.DriverId);
        expect(storedDriver.ToDate).toEqual(driverPeriodicInspection.ToDate);
        expect(storedDriver.FromDate).toEqual(driverPeriodicInspection.FromDate);
        expect(storedDriver.DocumentType).toEqual(driverPeriodicInspection.DocumentType);
        expect(storedDriver.Note).toEqual(driverPeriodicInspection.Note);
        expect(storedDriver.CreatedAt).toBeDefined();
        expect(storedDriver.UpdatedAt).toBeDefined();
    });

    test('should update properly', async () => {
        const inspection = await repository.findOne({
            where: {
                DriverId: 2,
                FromDate: '2020-01-01',
                ToDate: '2020-10-01',
                DocumentType: DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
            }
        });

        const inspectionToUpdate = new DriverPeriodicInspectionBuilder()
            .setDriver(2)
            .setDocumentType(DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION)
            .setFromDate('2020-01-01')
            .setToDate('2020-10-01')
            .setNote('nowa notatka')
            .build();

        await repository.update(
            {
                DriverId: 2,
                FromDate: '2020-01-01',
                ToDate: '2020-10-01',
                DocumentType: DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
            },
            inspectionToUpdate
        );

        const updated = await repository.findOneBy({
            DriverId: 2,
            FromDate: '2020-01-01',
            ToDate: '2020-10-01',
            DocumentType: DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
        });

        expect(updated.DriverId).toEqual(inspection.DriverId);
        expect(updated.FromDate).toEqual(inspection.FromDate);
        expect(updated.ToDate).toEqual(inspection.ToDate);
        expect(updated.DocumentType).toEqual(inspection.DocumentType);
        expect(inspection.Note).toEqual('notatka2');
        expect(updated.Note).toEqual('nowa notatka');
    });

    test('should delete properly', async () => {
        const inspection = await repository.findOneBy({
            DriverId: 2,
            FromDate: '2020-01-01',
            ToDate: '2020-10-01',
            DocumentType: DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
        });

        await repository.delete({
            DriverId: 2,
            FromDate: '2020-01-01',
            ToDate: '2020-10-01',
            DocumentType: DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
        });

        const deletedInspection = await repository.findOne({
            where: {
                DriverId: 2,
                FromDate: '2020-01-01',
                ToDate: '2020-10-01',
                DocumentType: DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
            }
        });

        expect(deletedInspection).toBeFalsy();
    });
});
