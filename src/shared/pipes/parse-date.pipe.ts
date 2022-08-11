import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
    transform(value: string, metadata: ArgumentMetadata): Date {
        if (dayjs(value).isValid()) return new Date(value);
        return null;
    }
}
