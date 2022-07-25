import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle, VehicleBuilder } from '../../modules/vehicle/vehicle.entity';
import { Repository } from 'typeorm';
import {
    VehicleMileage,
    VehicleMileageBuilder
} from '../../modules/vehicle-mileage/vehicle-mileage.entity';
import {
    VehiclePeriodicInspection,
    VehiclePeriodicInspectionBuilder
} from '../../modules/vehicle-periodic-inspection/vehicle-periodic-inspection.entity';
import { Driver, DriverBuilder } from '../../modules/driver/driver.entity';
import {
    DriverPeriodicInspection,
    DriverPeriodicInspectionBuilder
} from '../../modules/driver-periodic-inspection/driver-periodic-inspection.entity';
import { DriverPeriodicInspectionDocumentTypeEnum } from '../../modules/driver-periodic-inspection/DriverPeriodicInspectionDocumentType.enum';
import { type } from "os";

@Injectable()
export class SeederService implements OnApplicationBootstrap {
    private readonly logger = new Logger(SeederService.name);

    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
        @InjectRepository(VehiclePeriodicInspection)
        private vehiclePeriodicInspectionRepository: Repository<VehiclePeriodicInspection>,
        @InjectRepository(VehicleMileage)
        private vehicleMileageRepository: Repository<VehicleMileage>,
        @InjectRepository(Driver)
        private driverRepository: Repository<Driver>,
        @InjectRepository(DriverPeriodicInspection)
        private driverPeriodicInspectionRepository: Repository<DriverPeriodicInspection>
    ) {
        this.logger.log('------INIT DATABASE-----');
    }

    normalize<T extends {[key:string]:any }>(array: Array<T>, keyValue: keyof T) {
        return array.reduce<{ [key: string | number | symbol]: T }>(
            (previousValue, currentValue) => {
                if (keyValue in currentValue) {
                    const key = currentValue[keyValue];
                    previousValue[key] = currentValue;
                }
                return previousValue;
            },
            {}
        );
    }

    async InitializeVehicles() {
        const vehicle1 = new VehicleBuilder()
            .setId(1)
            .setPlates('TKI30KU')
            .setShortName('ZIELONA STRZAŁA')
            .setSeatsCount(5)
            .build();
        const vehicle2 = new VehicleBuilder()
            .setId(2)
            .setPlates('TK12312')
            .setShortName('super fura')
            .setSeatsCount(30)
            .build();
        const vehicle3 = new VehicleBuilder()
            .setId(3)
            .setPlates('WS453491')
            .setShortName('Duży')
            .setSeatsCount(52)
            .build();
        const vehicle4 = new VehicleBuilder()
            .setId(4)
            .setPlates('WW4341DF')
            .setShortName('testiwa')
            .setSeatsCount(43)
            .build();

        const vehicles = [vehicle1, vehicle2, vehicle3, vehicle4];
        await this.vehicleRepository.save(vehicles);
        this.logger.log('Initialized vehicles:\t\t\t' + vehicles.length);
        return this.normalize(vehicles, 'Id');
    }
    async InitializeVehicleMileage(vehicles: { [key: string]: Vehicle }) {
        let mileage = 441233;

        const entities = [
            new VehicleMileageBuilder()
                .setVehicle(vehicles[1])
                .setDate(new Date('2020-01-01'))
                .setMileageKm(mileage)
                .build(),
            new VehicleMileageBuilder()
                .setVehicle(vehicles[1])
                .setDate(new Date('2020-01-02'))
                .setMileageKm(mileage + 320)
                .build(),
            new VehicleMileageBuilder()
                .setVehicle(vehicles[1])
                .setDate(new Date('2020-01-03'))
                .setMileageKm(mileage + 432)
                .build(),
            new VehicleMileageBuilder()
                .setVehicle(vehicles[1])
                .setDate(new Date('2020-01-04'))
                .setMileageKm(mileage + 651)
                .build(),
            new VehicleMileageBuilder()
                .setVehicle(vehicles[2])
                .setDate(new Date('2020-01-04'))
                .setMileageKm(651234)
                .build()

        ];
        await this.vehicleMileageRepository.save(
            entities
        );
        this.logger.log('Initialized VehicleMileage:\t\t' + entities.length);
        return;
    }
    async InitializeVehiclePeriodicInspection(vehicles: {
        [key: string]: Vehicle;
    }) {
        const entities = [
            new VehiclePeriodicInspectionBuilder()
                .setVehicle(vehicles[1])
                .setInspectionType('Jakiśtam')
                .setFromDate(new Date('2020-01-01'))
                .setToDate(new Date('2021-01-01'))
                .build(),
            new VehiclePeriodicInspectionBuilder()
                .setVehicle(vehicles[1])
                .setInspectionType('Jakiśtam')
                .setFromDate(new Date('2020-11-28'))
                .setToDate(new Date('2021-11-28'))
                .build(),
            new VehiclePeriodicInspectionBuilder()
                .setVehicle(vehicles[2])
                .setInspectionType('Jakiśtam')
                .setFromDate(new Date('2021-01-01'))
                .setToDate(new Date('2022-01-01'))
                .build(),
            new VehiclePeriodicInspectionBuilder()
                .setVehicle(vehicles[2])
                .setInspectionType('Jakiśtam')
                .setFromDate(new Date('2022-11-28'))
                .setToDate(new Date('2023-11-28'))
                .build()
        ];

        await this.vehiclePeriodicInspectionRepository.save(entities);
        this.logger.log(
            'Initialized VehiclePeriodicInspection:\t' + entities.length
        );
    }
    async onApplicationBootstrap() {
        const vehicles = await this.InitializeVehicles();
        await this.InitializeVehicleMileage(vehicles);
        await this.InitializeVehiclePeriodicInspection(vehicles);

        /*
         *   DRIVER
         * */

        const driver1 = new DriverBuilder()
            .setId(1)
            .setEmail('krzysztofkaczor92@gmail.com')
            .setIsEmailConfirmed(true)
            .setPhone('787652532')
            .setIsPhoneConfirmed(true)
            .setName('Krzysztof')
            .setSurname('Kaczor')
            .build();

        const driver2 = new DriverBuilder()
            .setId(2)
            .setEmail('madzia_galach@gmail.com')
            .setIsEmailConfirmed(false)
            .setPhone('45431234512')
            .setIsPhoneConfirmed(false)
            .setName('Magdalena')
            .setSurname('Gałach')
            .build();

        await this.driverRepository.save([driver1, driver2]);

        /*
         *   DRIVER PERIODIC INSPECTION
         *
         * */
        const driver1PeriodicInspections = [
            new DriverPeriodicInspectionBuilder()
                .setDriver(driver1)
                .setFromDate(new Date('2020-01-01'))
                .setToDate(new Date('2025-01-01'))
                .setDocumentType(
                    DriverPeriodicInspectionDocumentTypeEnum.DRIVING_LICENSE
                )
                .build(),
            new DriverPeriodicInspectionBuilder()
                .setDriver(driver1)
                .setFromDate(new Date('2022-01-01'))
                .setToDate(new Date('2026-01-01'))
                .setDocumentType(
                    DriverPeriodicInspectionDocumentTypeEnum.PERIODIC_INSPECTION
                )
                .build()
        ];

        await this.driverPeriodicInspectionRepository.save(
            driver1PeriodicInspections
        );
    }
}
