import { Validator } from '../../../shared/shared.validator';
import { Driver } from '../entities/driver.entity';
import { CreateDriverDto } from '../dtos/create-driver.dto';
import { UpdateDriverDto } from '../dtos/update-driver.dto';
import { DriverStrategyValidator } from './driver-strategy.validator';
import { CreateDriverDtoStrategyValidator } from './create-driver-dto-strategy.validator';
import { UpdateDriverDtoStrategyValidator } from './update-driver-dto-strategy.validator';

export class DriverValidator extends Validator<
    Driver | CreateDriverDto | UpdateDriverDto
> {
    validate() {
        if (this.value instanceof Driver)
            return new DriverStrategyValidator(this.value).validate();
        else if (this.value instanceof UpdateDriverDto)
            return new UpdateDriverDtoStrategyValidator(this.value).validate();
        else return new CreateDriverDtoStrategyValidator(this.value).validate();
    }
}
