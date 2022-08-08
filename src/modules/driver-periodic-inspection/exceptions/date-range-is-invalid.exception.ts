import { HttpException, HttpStatus } from '@nestjs/common';

export class DateRangeIsInvalidException extends HttpException{
    constructor() {
        super("Date range is invalid!", HttpStatus.BAD_REQUEST);
    }
}