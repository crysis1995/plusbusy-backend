import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Users } from '../users/users.entity';
import { BuilderTemplate } from '../../shared/shared.types';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column()
    Name: string;

    @ManyToOne(() => Users, (user) => user.Id)
    @JoinColumn({ name: 'AdminId' })
    Admin: Users;

    @Column()
    AdminId: number;

    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;
}

export class CompanyBuilder extends BuilderTemplate<Company> {
    constructor() {
        super(new Company());
    }

    setId(value: Company['Id']) {
        this.value.Id = value;
        return this;
    }
    setName(value: Company['Name']) {
        this.value.Name = value;
        return this;
    }
    setAdmin(value: Company['Admin']) {
        this.value.AdminId = value.Id;
        this.value.Admin = value;
        return this;
    }
}
