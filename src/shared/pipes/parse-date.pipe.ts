import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
    transform(value: string, metadata: ArgumentMetadata): Date {
        if (dayjs(value).isValid()) return new Date(value);
        throw new BadRequestException({}, 'Date is invalid!');
    }
}
