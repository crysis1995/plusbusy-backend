import { HttpException, HttpStatus } from "@nestjs/common";

export class UserHasNotAccessToCompanyException extends HttpException{
    constructor() {
        super("User has not access to provided company.",HttpStatus.UNAUTHORIZED);
    }
}