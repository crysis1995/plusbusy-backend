import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";

export class Driver extends BaseEntity{
    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    Name:string;

    @Column()
    Surname:string;

    @Column()
    Phone:string;

    @Column()
    Email:string;

    @Column()
    IsPhoneConfirmed:boolean;

    @Column()
    IsEmailConfirmed:boolean;
}