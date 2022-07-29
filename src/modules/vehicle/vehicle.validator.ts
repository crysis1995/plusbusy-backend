import { Validator } from '../../shared/shared.validator';
import { Vehicle } from './vehicle.entity';
import { CustomException, ThrowException } from '../../shared/shared.exception';
import { VehicleShortNameTooLongException } from './exceptions/vehicle-short-name-too-long.exception';
import { VehicleSeatsCountTooLowException } from './exceptions/vehicle-seats-count-too-low.exception';
import { VehicleSeatsCountTooHighException } from './exceptions/vehicle-seats-count-too-high.exception';
import { VehicleShortNameTooShortException } from './exceptions/vehicle-short-name-too-short.exception';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

export class GeneralVehicleValidator {
    static VEHICLE_SHORT_NAME_MAX_LENGTH = 20;
    static VEHICLE_SHORT_NAME_MIN_LENGTH = 2;
    static VEHICLE_SEATS_MIN_COUNT = 2;
    static VEHICLE_SEATS_MAX_COUNT = 70;

    @ThrowException(VehicleShortNameTooLongException)
    static validateShortNameMaxLength(value: string): CustomException<Vehicle> | boolean {
        return value.length < GeneralVehicleValidator.VEHICLE_SHORT_NAME_MAX_LENGTH;
    }

    @ThrowException(VehicleShortNameTooShortException)
    static validateShortNameMinLength(value: string): CustomException<Vehicle> | boolean {
        return value.length > GeneralVehicleValidator.VEHICLE_SHORT_NAME_MIN_LENGTH;
    }

    static validatePlates(): CustomException<Vehicle> | boolean {
        return true;
    }

    @ThrowException(VehicleSeatsCountTooLowException)
    static validateMinSeatsCount(value: number): CustomException<Vehicle> | boolean {
        return GeneralVehicleValidator.VEHICLE_SEATS_MIN_COUNT < value;
    }
    @ThrowException(VehicleSeatsCountTooHighException)
    static validateMaxSeatsCount(value: number): CustomException<Vehicle> | boolean {
        return value < GeneralVehicleValidator.VEHICLE_SEATS_MAX_COUNT;
    }
}

export class VehicleStrategyValidator extends Validator<Vehicle> {
    validate() {
        return super.validate(
            GeneralVehicleValidator.validateShortNameMaxLength(this.value.ShortName),
            GeneralVehicleValidator.validateShortNameMinLength(this.value.ShortName),
            GeneralVehicleValidator.validatePlates(),
            GeneralVehicleValidator.validateMinSeatsCount(this.value.SeatsCount),
            GeneralVehicleValidator.validateMaxSeatsCount(this.value.SeatsCount)
        );
    }
}
export class CreateVehicleDtoStrategyValidator extends Validator<CreateVehicleDto> {
    validate() {
        return super.validate(
            GeneralVehicleValidator.validateShortNameMaxLength(this.value.ShortName),
            GeneralVehicleValidator.validateShortNameMinLength(this.value.ShortName),
            GeneralVehicleValidator.validatePlates(),
            GeneralVehicleValidator.validateMinSeatsCount(this.value.SeatsCount),
            GeneralVehicleValidator.validateMaxSeatsCount(this.value.SeatsCount)
        );
    }
}
export class UpdateVehicleDtoStrategyValidator extends Validator<UpdateVehicleDto> {
    validate() {
        const validators = [];
        switch (true) {
            case this.value.ShortName !== undefined:
                validators.push(GeneralVehicleValidator.validateShortNameMaxLength(this.value.ShortName));
                validators.push(GeneralVehicleValidator.validateShortNameMinLength(this.value.ShortName));
            case this.value.SeatsCount !== undefined:
                validators.push(GeneralVehicleValidator.validateMinSeatsCount(this.value.SeatsCount));
                validators.push(GeneralVehicleValidator.validateMaxSeatsCount(this.value.SeatsCount));
            case this.value.Plates !== undefined:
                validators.push(GeneralVehicleValidator.validatePlates());
        }
        return super.validate(validators);
    }
}

export class VehicleValidator extends Validator<Vehicle | CreateVehicleDto | UpdateVehicleDto> {
    validate() {
        if (this.value instanceof Vehicle)
            return new VehicleStrategyValidator(this.value).validate();
        else if (this.value instanceof CreateVehicleDto)
            return new CreateVehicleDtoStrategyValidator(this.value).validate();
        else return new UpdateVehicleDtoStrategyValidator(this.value).validate();
    }
}
