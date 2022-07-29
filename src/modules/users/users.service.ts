import { Injectable } from "@nestjs/common";
import { UsersBuilder, Users } from "./users.entity";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
    private readonly users: Users[] = [
        new UsersBuilder().setId(1).setEmail('test@asdm.com').setIsEmailConfirmed(true).setNick('crysis95').build(),
        new UsersBuilder().setId(2).setEmail('magda123@asdm.com').setIsEmailConfirmed(false).setNick('magDAAA').build()
    ];

    async findByEmailOrNick(value: string) {
        let key: keyof Users = 'Email';
        if (!value.includes('@')) key = 'Nick';
        return this.users.find((x) => x[key] === value);
    }

    async createUser(dto: CreateUserDto) {
        if (
            (dto.Nick !== undefined && (await this.findByEmailOrNick(dto.Nick))) ||
            (await this.findByEmailOrNick(dto.Email))
        ) {
        }
    }

    async deleteUser(userId: Users['Id']) {}
}
