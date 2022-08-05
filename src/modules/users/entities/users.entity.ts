import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { BuilderTemplate } from '../../../shared/shared.types';
import { z } from 'nestjs-zod/z';
import { Exclude, Expose } from "class-transformer";

export const UserSchema = z.object({
    Id: z.number().int(),
    Email: z.string().email(),
    Password: z.string(),
    Nick: z.string().optional(),
    IsEmailConfirmed: z.boolean()
});

export type UserType = z.infer<typeof UserSchema>;

@Entity()
export class Users {
    @PrimaryColumn()
    Id: number;

    @Column({ unique: true })
    Email: string;

    @Column()
    IsEmailConfirmed: boolean;

    @Exclude()
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

    setId(value: UserType['Id']) {
        this.value.Id = value;
        return this;
    }
    setEmail(value: UserType['Email']) {
        this.value.Email = value;
        return this;
    }
    setIsEmailConfirmed(value: UserType['IsEmailConfirmed']) {
        this.value.IsEmailConfirmed = value;
        return this;
    }
    setPassword(value: UserType['Password']) {
        this.value.Password = value;
        return this;
    }
    setNick(value: UserType['Nick']) {
        this.value.Nick = value;
        return this;
    }
}
