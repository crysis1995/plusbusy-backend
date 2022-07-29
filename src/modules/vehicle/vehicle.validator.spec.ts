import { VehicleValidator } from "./vehicle.validator";
import { VehicleShortNameTooLongException } from "./exceptions/vehicle-short-name-too-long.exception";
import { VehicleSeatsCountTooLowException } from "./exceptions/vehicle-seats-count-too-low.exception";
import { VehicleSeatsCountTooHighException } from "./exceptions/vehicle-seats-count-too-high.exception";

describe('Unit Test - Vehicle Validator', () => {
    let vehicleValidator: VehicleValidator = null;

    beforeEach(() => {
        vehicleValidator = new VehicleValidator(null, true);
    });

    describe('Test ShortName property', () => {
        it('should throw an VehicleShortNameTooLongException error', function () {
            const result = () => vehicleValidator.validateShortName('very very very very very long name');

            expect(result).toThrow(VehicleShortNameTooLongException);
            expect(result).toThrowError(
                `Short name is too long. Max is ${VehicleValidator.VEHICLE_SHORT_NAME_MAX_LENGTH}`
            );
        });
        it('should not throw an VehicleShortNameTooLongException error', function () {
            const result = () => vehicleValidator.validateShortName('short name');

            expect(result).not.toThrow();
        });
    });

    describe('Test Plates property', () => {
        it('should not throw an VehicleShortNameTooLongException error', function () {
            const result = () => vehicleValidator.validatePlates('TKI 33123f123');

            expect(result).not.toThrow();
        });
    });

    describe('Test SeatsCount property', () => {
        it('should throw an VehicleSeatsCountTooLowException error', function () {
            const result = () => vehicleValidator.validateSeatsCount(1);

            expect(result).toThrow(VehicleSeatsCountTooLowException);
            expect(result).toThrowError(`Seats count is too low. Min is ${VehicleValidator.VEHICLE_SEATS_MIN_COUNT}`);
        });
        it('should not throw an VehicleSeatsCountTooLowException error', function () {
            const result = () => vehicleValidator.validateSeatsCount(20);

            expect(result).not.toThrow();
        });

        it('should throw an VehicleSeatsCountTooHighException error', function () {
            const result = () => vehicleValidator.validateSeatsCount(71);

            expect(result).toThrow(VehicleSeatsCountTooHighException);
            expect(result).toThrowError(`Seats count is too high. Max is ${VehicleValidator.VEHICLE_SEATS_MAX_COUNT}`);
        });
        it('should not throw an VehicleSeatsCountTooHighException error', function () {
            const result = () => vehicleValidator.validateSeatsCount(20);

            expect(result).not.toThrow();
        });
    });
});
