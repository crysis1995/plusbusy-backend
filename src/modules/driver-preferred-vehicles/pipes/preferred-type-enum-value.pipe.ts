import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PreferredTypeEnum } from '../enums/preferred-type.enum';

@Injectable()
export class PreferredTypeEnumValuePipe implements PipeTransform<string, PreferredTypeEnum> {
    transform(value: string, metadata: ArgumentMetadata): PreferredTypeEnum {
        const parsedValue = PreferredTypeEnum[value];
        if (!parsedValue)
            throw new BadRequestException(
                `Expected one of value: [${Object.keys(PreferredTypeEnum).join(', ')}]`
            );
        return parsedValue;
    }
}
