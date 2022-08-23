import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Vehicle, VehicleBuilder } from '../../modules/vehicle/entities/vehicle.entity';
import { DataSource } from 'typeorm';
import {
    VehicleMileage,
    VehicleMileageBuilder
} from '../../modules/vehicle-mileage/entities/vehicle-mileage.entity';
import {
    VehiclePeriodicInspection,
    VehiclePeriodicInspectionBuilder
} from '../../modules/vehicle-periodic-inspection/entities/vehicle-periodic-inspection.entity';
import { Driver, DriverBuilder } from '../../modules/driver/entities/driver.entity';
import {
    DriverPeriodicInspection,
    DriverPeriodicInspectionBuilder
} from '../../modules/driver-periodic-inspection/entities/driver-periodic-inspection.entity';
import { DriverPeriodicInspectionDocumentTypeEnum } from '../../modules/driver-periodic-inspection/enums/driver-periodic-inspection-document-type.enum';
import { Company, CompanyBuilder } from '../../modules/company/entities/company.entity';
import { Users, UsersBuilder } from '../../modules/users/entities/users.entity';
import { VehicleInspectionTypeEnum } from '../../modules/vehicle-periodic-inspection/enums/vehicle-inspection-type.enum';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
    private readonly logger = new Logger(SeederService.name);
    @Inject(DataSource)
    private dataSource: DataSource;

    constructor() {
        this.logger.log('------INIT DATABASE-----');
    }

    async onApplicationBootstrap() {
        await this.InitializeUsers();
        await this.InitializeCompanies();
        await this.InitializeVehicles();
        await this.InitializeVehicleMileage();
        await this.InitializeVehiclePeriodicInspection();
        await this.InitializeDrivers();
        await this.InitializeDriverPeriodicInspections();
    }
    async InitializeUsers() {
        const users = [
            new UsersBuilder()
                .setId(438)
                .setEmail('krzysztofkaczor95@gmail.com')
                .setIsEmailConfirmed(true)
                .setNick('crysis95')
                .setPassword('krzys19950')
                .build(),
            new UsersBuilder()
                .setId(620)
                .setEmail('admin@gmail.com')
                .setIsEmailConfirmed(false)
                .setNick('admin123')
                .setPassword('1274DZ')
                .build()
        ];

        await this.dataSource.manager.save(Users, users);
        this.logger.log('Initialized Users:\t\t' + users.length);
    }
    async InitializeCompanies() {
        const companies = [
            new CompanyBuilder()
                .setId('07380314-da25-4720-853b-a93ad39bcecd')
                .setName('Plus Busy')
                .setAdmin(438)
                .build(),
            new CompanyBuilder()
                .setId('f8d760be-9351-4b61-bfa9-3cafa23cb44d')
                .setName('Flixbus')
                .setAdmin(620)
                .build()
        ];

        await this.dataSource.manager.save(Company, companies);
        this.logger.log('Initialized Companies:\t' + companies.length);
    }
    async InitializeVehicles() {
        const vehicles = [
            new VehicleBuilder()
                .setId(1)
                .setPlates('TKI30KU')
                .setShortName('ZIELONA STRZAŁA')
                .setSeatsCount(5)
                .setCompany('07380314-da25-4720-853b-a93ad39bcecd')
                .build(),
            new VehicleBuilder()
                .setId(2)
                .setPlates('TK12312')
                .setShortName('super fura')
                .setSeatsCount(30)
                .setCompany('07380314-da25-4720-853b-a93ad39bcecd')
                .build(),
            new VehicleBuilder()
                .setId(3)
                .setPlates('WS453491')
                .setShortName('Duży')
                .setSeatsCount(52)
                .setCompany('07380314-da25-4720-853b-a93ad39bcecd')
                .build(),
            new VehicleBuilder()
                .setId(4)
                .setPlates('WW4341DF')
                .setShortName('testiwa')
                .setSeatsCount(43)
                .setCompany('07380314-da25-4720-853b-a93ad39bcecd')
                .build()
        ];
        await this.dataSource.manager.save(Vehicle, vehicles);
        this.logger.log('Initialized vehicles:\t' + vehicles.length);
    }
    async InitializeVehicleMileage() {
        let mileage = 441233;

        const entities = [
            new VehicleMileageBuilder()
                .setVehicle(1)
                .setDate(new Date('2020-01-01'))
                .setMileageKm(mileage)
                .build(),
            new VehicleMileageBuilder()
                .setVehicle(1)
                .setDate(new Date('2020-01-02'))
                .setMileageKm(mileage + 320)
                .build(),
            new VehicleMileageBuilder()
                .setVehicle(1)
                .setDate(new Date('2020-01-03'))
                .setMileageKm(mileage + 432)
                .build(),
            new VehicleMileageBuilder()
                .setVehicle(1)
                .setDate(new Date('2020-01-04'))
                .setMileageKm(mileage + 651)
                .build(),
            new VehicleMileageBuilder()
                .setVehicle(2)
                .setDate(new Date('2020-01-04'))
                .setMileageKm(651234)
                .build()
        ];
        await this.dataSource.manager.save(VehicleMileage, entities);
        this.logger.log('Initialized VehicleMileage:\t\t' + entities.length);
    }
    async InitializeVehiclePeriodicInspection() {
        const entities = [
            new VehiclePeriodicInspectionBuilder()
                .setVehicle(1)
                .setInspectionType(VehicleInspectionTypeEnum.GENERAL_INSPECTION)
                .setFromDate(new Date('2020-01-01'))
                .setToDate(new Date('2021-01-01'))
                .build(),
            new VehiclePeriodicInspectionBuilder()
                .setVehicle(1)
                .setInspectionType(VehicleInspectionTypeEnum.GENERAL_INSPECTION)
                .setFromDate(new Date('2020-11-28'))
                .setToDate(new Date('2021-11-28'))
                .build(),
            new VehiclePeriodicInspectionBuilder()
                .setVehicle(2)
                .setInspectionType(VehicleInspectionTypeEnum.GENERAL_INSPECTION)
                .setFromDate(new Date('2021-01-01'))
                .setToDate(new Date('2022-01-01'))
                .build(),
            new VehiclePeriodicInspectionBuilder()
                .setVehicle(2)
                .setInspectionType(VehicleInspectionTypeEnum.GENERAL_INSPECTION)
                .setFromDate(new Date('2022-11-28'))
                .setToDate(new Date('2023-11-28'))
                .build()
        ];

        await this.dataSource.manager.save(VehiclePeriodicInspection, entities);
        this.logger.log('Initialized VehiclePeriodicInspection:\t' + entities.length);
    }
    async InitializeDrivers() {
        const entities = [
            new DriverBuilder()
                .setId(1)
                .setEmail('krzysztofkaczor92@gmail.com')
                .setIsEmailConfirmed(true)
                .setPhone('787652532')
                .setIsPhoneConfirmed(true)
                .setName('Krzysztof')
                .setSurname('Kaczor')
                .build(),
            new DriverBuilder()
                .setId(2)
                .setEmail('madzia_galach@gmail.com')
                .setIsEmailConfirmed(false)
                .setPhone('45431234512')
                .setIsPhoneConfirmed(false)
                .setName('Magdalena')
                .setSurname('Gałach')
                .build()
        ];
        await this.dataSource.manager.save(Driver, entities);
        this.logger.log('Initialized Drivers:\t' + entities.length);
    }
    async InitializeDriverPeriodicInspections() {
        const driver1PeriodicInspections = [
            new DriverPeriodicInspectionBuilder()
                .setDriver(1)
                .setFromDate(new Date('2020-01-01'))
                .setToDate(new Date('2025-01-01'))
                .setDocumentType(DriverPeriodicInspectionDocumentTypeEnum.DRIVING_LICENSE)
                .build(),
            new DriverPeriodicInspectionBuilder()
                .setDriver(1)
                .setFromDate(new Date('2022-01-01'))
                .setToDate(new Date('2026-01-01'))
                .setDocumentType(DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION)
                .build()
        ];

        await this.dataSource.manager.save(DriverPeriodicInspection, driver1PeriodicInspections);
        this.logger.log(
            'Initialized Driver Periodic Inspections:\t' + driver1PeriodicInspections.length
        );
    }
}
