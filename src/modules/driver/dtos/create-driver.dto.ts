import { BuilderTemplate } from "../../../shared/shared.types";
import { Driver } from "../driver.entity";

export class CreateDriverDto{
    Name: string;
    Surname: string;
    Phone: string | undefined;
    Email: string | undefined;
}

export class CreateDriverDtoBuilder extends BuilderTemplate<CreateDriverDto>{
    constructor() {
        super(new CreateDriverDto());
    }

    setName(value: CreateDriverDto['Name']) {
        this.value.Name = value;
        return this;
    }

    setSurname(value: CreateDriverDto['Surname']) {
        this.value.Surname = value;
        return this;
    }

    setPhone(value: CreateDriverDto['Phone']) {
        this.value.Phone = value;
        return this;
    }

    setEmail(value: CreateDriverDto['Email']) {
        this.value.Email = value;
        return this;
    }
}