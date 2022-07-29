import { MileageTooHighException } from "./exceptions/mileage-too-high.exception";
import { VehicleMileageValidator } from "./vehicle-mileage.validator";
import { VehicleMileage, VehicleMileageBuilder } from "./vehicle-mileage.entity";

describe('VehicleMileageValidator', () => {
    let vehicleMileage: VehicleMileage = null;
    let vehicleMileageValidator: VehicleMileageValidator = null;
    beforeEach(() => {
        vehicleMileage = new VehicleMileageBuilder()
            .setVehicleId(123)
            .setMileageKm(123.312)
            .setDate(new Date(2020, 0, 1))
            .build();

        vehicleMileageValidator = new VehicleMileageValidator(vehicleMileage, true);
    });

    it('should throw MileageTooHighException error', function () {
        const validateFunction = () => vehicleMileageValidator.validateMileage(1);

        expect(validateFunction).toThrow(MileageTooHighException);
        expect(validateFunction).toThrowError(
            `Mileage of vehicle's ID: ${vehicleMileage.VehicleId} has too high mileage value`
        );
    });

    it('should not throw MileageTooHighException error', function () {
        const validateFunction = () => vehicleMileageValidator.validateMileage(200);

        expect(validateFunction).not.toThrow(MileageTooHighException);
        expect(validateFunction).not.toThrowError(
            `Mileage of vehicle's ID: ${vehicleMileage.VehicleId} has too high mileage value`
        );
    });
});
