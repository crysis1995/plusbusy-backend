import { Validator } from '../../../shared/shared.validator';
import { Driver } from '../entities/driver.entity';
import { GeneralDriverValidator } from './general-driver.validator';

export class DriverStrategyValidator extends Validator<Driver> {
    validate() {
        return super.validate(
            GeneralDriverValidator.validateEmail(this.value.Email),
            GeneralDriverValidator.validateNameMaxLength(this.value.Name),
            GeneralDriverValidator.validateNameMinLength(this.value.Name),
            GeneralDriverValidator.validateSurnameMaxLength(this.value.Surname),
            GeneralDriverValidator.validateSurnameMinLength(this.value.Surname),
            GeneralDriverValidator.validatePhoneNumberMaxLength(this.value.Phone),
            GeneralDriverValidator.validatePhoneNumberMinLength(this.value.Phone)
        );
    }
}
