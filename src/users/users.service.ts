import { Injectable } from '@nestjs/common';
import { UserBuilder, Users } from './users.entity';

@Injectable()
export class UsersService {
    private readonly users: Users[] = [
        new UserBuilder()
            .setId(1)
            .setEmail('test@asdm.com')
            .setIsEmailConfirmed(true)
            .setNick('crysis95')
            .build(),
        new UserBuilder()
            .setId(2)
            .setEmail('magda123@asdm.com')
            .setIsEmailConfirmed(false)
            .setNick('magDAAA')
            .build()
    ];

    async findByEmailOrNick(value: string) {
        let key: keyof Users = 'Email';
        if (!value.includes('@')) key = 'Nick';
        return this.users.find((x) => x[key] === value);
    }
}
