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
        const driver2 = new DriverBuilder()
            .setId(2)
            .setName('Adam')
            .setSurname('Nowak')
            .build();
        await ds.manager.insert(Driver, [driver1, driver2]);

        const driverInspection1 = new DriverPeriodicInspectionBuilder()
            .setDriver(1)
            .setDocumentType(
                DriverPeriodicInspectionDocumentTypeEnum.DRIVING_LICENSE
            )
            .setNote('notatka')
            .setFromDate(new Date('2020-01-01'))
            .setToDate(new Date('2020-10-01'))
            .build();

        const driverInspection2 = new DriverPeriodicInspectionBuilder()
            .setDriver(2)
            .setDocumentType(
                DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
            )
            .setNote('notatka')
            .setFromDate(new Date('2020-01-01'))
            .setToDate(new Date('2020-10-01'))
            .build();

        await ds.manager.insert(DriverPeriodicInspection, [driverInspection1, driver2]);
    }

    beforeAll(async () => {
        testingModule = await CreateTestingModuleUtil(
            Driver,
            DriverPeriodicInspection
        );
        ds = testingModule.get(DataSource);
        await seedDatabase(ds);
        repository = ds.getRepository(DriverPeriodicInspection);
    });

    afterAll(() => testingModule.close());
});
