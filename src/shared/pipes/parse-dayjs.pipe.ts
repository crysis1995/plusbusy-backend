import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class ParseDayjsPipe implements PipeTransform<string, dayjs.Dayjs> {
    transform(value: string, metadata: ArgumentMetadata): dayjs.Dayjs {
        const date = dayjs(value);
        if (date.isValid()) return date;
        throw new BadRequestException({}, 'Date is invalid!');
    }
}
