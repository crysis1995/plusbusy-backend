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
import { Course, CourseBuilder } from '../../modules/course/entities/course.entity';
import { CourseTypeEnum } from '../../modules/course/enums/course-type.enum';
import {
    CourseResources,
    CourseResourcesBuilder
} from '../../modules/course-resources/entities/course-resources.entity';

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
        await this.InitializeCourses();
        await this.InitializeCourseResources();
    }
    async InitializeUsers() {
        const entities = [
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
        await this.saveToDatabase(Users, entities);
    }
    async InitializeCompanies() {
        const entities = [
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

        await this.saveToDatabase(Company, entities);
    }
    async InitializeVehicles() {
        const entities = [
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
        await this.saveToDatabase(Vehicle, entities);
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
        await this.saveToDatabase(VehicleMileage, entities);
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
        await this.saveToDatabase(VehiclePeriodicInspection, entities);
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
        await this.saveToDatabase(Driver, entities);
    }
    async InitializeDriverPeriodicInspections() {
        const entities = [
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
        await this.saveToDatabase(DriverPeriodicInspection, entities);
    }

    async InitializeCourses() {
        const entities = [
            new CourseBuilder()
                .setId(1)
                .setNote('test note')
                .setStartDate(new Date('2020-01-01'))
                .setEndDate(new Date('2020-01-02'))
                .setCourseType(CourseTypeEnum.ON_DEMAND)
                .build(),
            new CourseBuilder()
                .setId(2)
                .setNote('another note')
                .setStartDate(new Date('2020-02-01'))
                .setEndDate(new Date('2020-02-05'))
                .setCourseType(CourseTypeEnum.ON_DEMAND)
                .build()
        ];

        await this.saveToDatabase(Course, entities);
    }

    async InitializeCourseResources() {
        const entities = [
            new CourseResourcesBuilder()
                .setId(1)
                .setCourseId(1)
                .setDriverId(1)
                .setVehicleId(1)
                .build(),
            new CourseResourcesBuilder()
                .setId(2)
                .setCourseId(1)
                .setDriverId(2)
                .setVehicleId(1)
                .build(),
            new CourseResourcesBuilder()
                .setId(3)
                .setCourseId(2)
                .setDriverId(1)
                .setVehicleId(2)
                .build(),
            new CourseResourcesBuilder()
                .setId(4)
                .setCourseId(2)
                .setDriverId(2)
                .setVehicleId(1)
                .build()
        ];
        await this.saveToDatabase(CourseResources, entities);
    }

    async saveToDatabase(type: any, entities: any[]) {
        await this.dataSource.manager.save(type, entities);
        this.logger.log(`Initialized ${type.name}:\t${entities.length}`);
    }
}
