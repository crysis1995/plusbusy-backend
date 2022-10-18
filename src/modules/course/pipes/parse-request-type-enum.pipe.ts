import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { RequestTypeEnum } from '../enums/request-type.enum';

@Injectable()
export class ParseRequestTypeEnumPipe implements PipeTransform<string, RequestTypeEnum> {
    transform(value: string, metadata: ArgumentMetadata): RequestTypeEnum {
        const type = RequestTypeEnum[value];
        if (type) return type;
        throw new BadRequestException(
            `Expected one of value: [${Object.keys(RequestTypeEnum).join(', ')}]`
        );
    }
}
