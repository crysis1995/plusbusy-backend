import { HttpException, HttpStatus } from "@nestjs/common";

export class CompanyMustBeAnUuidException extends HttpException{
    constructor() {
        super("Company must be an UUID type", HttpStatus.BAD_REQUEST);
    }
}