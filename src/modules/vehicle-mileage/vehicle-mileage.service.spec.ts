import { VehicleMileageService } from "./vehicle-mileage.service";
import { VehicleMileage } from "./vehicle-mileage.entity";
import { VehicleService } from "../vehicle/vehicle.service";
import { Vehicle } from "../vehicle/vehicle.entity";
import { Repository } from "typeorm";

jest.mock('./vehicle-mileage.entity');
jest.mock('../vehicle/vehicle.service');
jest.mock('../vehicle/vehicle.entity');

describe('UnitTest - VehicleMileageService', () => {
    let vehicleMileageService: VehicleMileageService = null;
    let vehicleMileageRepository: Repository<VehicleMileage> = null;
    let vehicleService: VehicleService = null;
    beforeEach(() => {
        vehicleMileageRepository = VehicleMileage.getRepository();
        vehicleService = new VehicleService(Vehicle.getRepository());

        vehicleMileageService = new VehicleMileageService(vehicleMileageRepository, vehicleService);
    });
    it('should has defined methods', function () {
        expect(vehicleMileageService.getNewestVehicleMileage).toBeDefined();
        expect(vehicleMileageService.setVehicleMileage).toBeDefined();
        expect(vehicleMileageService.getAllVehicleMileages).toBeDefined();
    });
});
