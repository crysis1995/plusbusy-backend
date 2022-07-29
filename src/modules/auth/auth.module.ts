import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";

@Module({
    imports: [],
    providers: [AuthService, UsersService]
})
export class AuthModule {}
