import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BuilderTemplate } from '../../shared/shared.types';

@Entity()
export class Driver {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @Column()
    Surname: string;

    @Column()
    Phone: string;

    @Column()
    Email: string;

    @Column()
    IsPhoneConfirmed: boolean;

    @Column()
    IsEmailConfirmed: boolean;
}

export class DriverBuilder extends BuilderTemplate<Driver> {
    constructor() {
        super(new Driver());
    }

    setId(value: Driver['Id']) {
        this.value.Id = value;
        return this;
    }

    setName(value: Driver['Name']) {
        this.value.Name = value;
        return this;
    }

    setSurname(value: Driver['Surname']) {
        this.value.Surname = value;
        return this;
    }

    setPhone(value: Driver['Phone']) {
        this.value.Phone = value;
        return this;
    }

    setEmail(value: Driver['Email']) {
        this.value.Email = value;
        return this;
    }

    setIsPhoneConfirmed(value: Driver['IsPhoneConfirmed']) {
        this.value.IsPhoneConfirmed = value;
        return this;
    }

    setIsEmailConfirmed(value: Driver['IsEmailConfirmed']) {
        this.value.IsEmailConfirmed = value;
        return this;
    }
}
