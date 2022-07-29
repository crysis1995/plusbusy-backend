import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { Users } from "../users/users.entity";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: Users['Email'] | Users['Nick'], password: Users['Password']) {
        const user = await this.usersService.findByEmailOrNick(username);
        if (user && user.Password === password) {
            const { Password, ...rest } = user;
            return rest;
        }
        return null;
    }
}
