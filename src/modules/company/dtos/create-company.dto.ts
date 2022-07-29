import { BuilderTemplate } from '../../../shared/shared.types';

export class CreateCompanyDto {}

export class CreateCompanyDtoBuilder extends BuilderTemplate<CreateCompanyDto> {
    constructor() {
        super(new CreateCompanyDto());
    }
}
