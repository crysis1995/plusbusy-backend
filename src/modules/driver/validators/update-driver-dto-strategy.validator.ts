import { Validator } from "../../../shared/shared.validator";
import { UpdateDriverDto } from "../dtos/update-driver.dto";
import { GeneralDriverValidator } from "./general-driver.validator";

export class UpdateDriverDtoStrategyValidator extends Validator<UpdateDriverDto> {
    validate() {
        const validators = [];
        switch (true) {
            case this.value.Email !== undefined:
                validators.push(GeneralDriverValidator.validateEmail(this.value.Email));
            case this.value.Name !== undefined:
                validators.push(GeneralDriverValidator.validateNameMaxLength(this.value.Name));
                validators.push(GeneralDriverValidator.validateNameMinLength(this.value.Name));

            case this.value.Surname !== undefined:
                validators.push(GeneralDriverValidator.validateSurnameMaxLength(this.value.Surname));
                validators.push(GeneralDriverValidator.validateSurnameMinLength(this.value.Surname));

            case this.value.Phone !== undefined:
                validators.push(GeneralDriverValidator.validatePhoneNumberMaxLength(this.value.Phone));
                validators.push(GeneralDriverValidator.validatePhoneNumberMinLength(this.value.Phone));
        }
        return super.validate(validators);
    }
}