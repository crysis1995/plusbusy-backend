import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { BuilderTemplate } from "../../shared/shared.types";

@Entity()
export class Users {
    @PrimaryColumn()
    Id: number;

    @Column({ unique: true })
    Email: string;

    @Column()
    IsEmailConfirmed: boolean;

    @Column()
    Password: string;

    @Column({ unique: true, nullable: true })
    Nick?: string;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}

export class UsersBuilder extends BuilderTemplate<Users> {
    constructor() {
        super(new Users());
    }

    setId(value: Users['Id']) {
        this.value.Id = value;
        return this;
    }
    setEmail(value: Users['Email']) {
        this.value.Email = value;
        return this;
    }
    setIsEmailConfirmed(value: Users['IsEmailConfirmed']) {
        this.value.IsEmailConfirmed = value;
        return this;
    }
    setPassword(value: Users['Password']) {
        this.value.Password = value;
        return this;
    }
    setNick(value: Users['Nick']) {
        this.value.Nick = value;
        return this;
    }
}
