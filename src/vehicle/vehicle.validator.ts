import { Validator } from '../shared.validator';
import { Vehicle } from './vehicle.entity';
import { ThrowException } from '../shared.exception';
import { VehicleShortNameTooLongException } from './exceptions/vehicle-short-name-too-long.exception';
import { VehicleSeatsCountTooLowException } from './exceptions/vehicle-seats-count-too-low.exception';
import { VehicleSeatsCountTooHighException } from './exceptions/vehicle-seats-count-too-high.exception';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

export class VehicleValidator extends Validator<Vehicle> {
    static MAX_VEHICLE_SHORT_NAME_LENGTH = 20;
    static MIN_VEHICLE_SEATS_COUNT = 2;
    static MAX_VEHICLE_SEATS_COUNT = 70;

    constructor(value?: Vehicle, throwError: boolean = true) {
        super(value, throwError);
    }

    @ThrowException(VehicleShortNameTooLongException)
    private validateShortName(value: Vehicle['ShortName']) {
        return value.length < VehicleValidator.MAX_VEHICLE_SHORT_NAME_LENGTH;
    }

    private validatePlates(value: Vehicle['Plates']) {
        return true;
    }

    private validateSeatsCount(value: Vehicle['SeatsCount']) {
        return (
            this.validateMinSeatsCount(value) &&
            this.validateMaxSeatsCount(value)
        );
    }

    @ThrowException(VehicleSeatsCountTooLowException)
    private validateMinSeatsCount(value: Vehicle['SeatsCount']) {
        return VehicleValidator.MIN_VEHICLE_SEATS_COUNT < value;
    }
    @ThrowException(VehicleSeatsCountTooHighException)
    private validateMaxSeatsCount(value: Vehicle['SeatsCount']) {
        return value < VehicleValidator.MAX_VEHICLE_SEATS_COUNT;
    }

    checkIfValid(object: CreateVehicleDto | UpdateVehicleDto) {
        if (object.ShortName !== undefined) {
            this.validateShortName(object.ShortName);
        }

        if (object.Plates !== undefined) {
            this.validatePlates(object.Plates);
        }

        if (object.SeatsCount !== undefined) {
            this.validateSeatsCount(object.SeatsCount);
        }
    }
}
