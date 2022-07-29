import { BuilderTemplate } from "../../../shared/shared.types";

export class CreateUserDto {
    Email: string;
    Password: string;
    Nick?: string;
}

export class CreateUserDtoBuilder extends BuilderTemplate<CreateUserDto> {
    constructor() {
        super(new CreateUserDto());
    }

    setEmail(value: CreateUserDto['Email']) {
        this.value.Email = value;
        return this;
    }
    setPassword(value: CreateUserDto['Password']) {
        this.value.Password = value;
        return this;
    }
    setNick(value: CreateUserDto['Nick']) {
        this.value.Nick = value;
        return this;
    }
}
