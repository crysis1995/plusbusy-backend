import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {BuilderTemplate} from '../../../shared/shared.types';
import {ApiProperty} from '@nestjs/swagger';
import {CreateDriverDto} from "../dtos/create-driver.dto";

@Entity()
export class Driver {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    Id: number;

    @ApiProperty()
    @Column()
    Name: string;

    @ApiProperty()
    @Column()
    Surname: string;

    @ApiProperty({nullable: true})
    @Column({nullable: true})
    Phone: string;

    @ApiProperty({nullable: true})
    @Column({nullable: true})
    Email: string;

    @ApiProperty({default: false})
    @Column({default: false})
    IsPhoneConfirmed: boolean;

    @ApiProperty({default: false})
    @Column({default: false})
    IsEmailConfirmed: boolean;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}

export class DriverBuilder extends BuilderTemplate<Driver> {
    constructor() {
        super(new Driver());
    }

    static fromDto(dto: CreateDriverDto) {
        return new DriverBuilder().setName(dto.Name).setSurname(dto.Surname).setPhone(dto.Phone).setEmail(dto.Email).build()
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
