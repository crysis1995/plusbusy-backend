import { BuilderTemplate } from '../../../shared/shared.types';

export class UpdateDriverDto {
    Name?: string;
    Surname?: string;
    Phone?: string;
    Email?: string;
}

export class UpdateDriverDtoBuilder extends BuilderTemplate<UpdateDriverDto> {
    constructor() {
        super(new UpdateDriverDto());
    }

    setName(value: UpdateDriverDto['Name']) {
        this.value.Name = value;
        return this;
    }

    setSurname(value: UpdateDriverDto['Surname']) {
        this.value.Surname = value;
        return this;
    }

    setPhone(value: UpdateDriverDto['Phone']) {
        this.value.Phone = value;
        return this;
    }

    setEmail(value: UpdateDriverDto['Email']) {
        this.value.Email = value;
        return this;
    }
}
