import { CustomException } from "../../../shared/shared.exception";
import { UserByNickOrEmailDto } from "../../users/dtos/user-by-nick-or-email.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

export class RequestDoesNotContainCompanyInfo extends HttpException{
    constructor() {
        super("Request does not contain any company.",HttpStatus.BAD_REQUEST);
    }
}