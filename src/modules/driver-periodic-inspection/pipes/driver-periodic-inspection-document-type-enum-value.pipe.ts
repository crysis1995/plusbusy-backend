import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { DriverPeriodicInspectionDocumentTypeEnum } from '../enums/driver-periodic-inspection-document-type.enum';

export class DriverPeriodicInspectionDocumentTypeEnumValuePipe
    implements PipeTransform<string, DriverPeriodicInspectionDocumentTypeEnum>
{
    transform(value: string, metadata: ArgumentMetadata): DriverPeriodicInspectionDocumentTypeEnum {
        const parsedValue = DriverPeriodicInspectionDocumentTypeEnum[value];
        if (!parsedValue)
            throw new BadRequestException(
                `Expected one of value: [${Object.keys(DriverPeriodicInspectionDocumentTypeEnum).join(', ')}]`
            );
        return parsedValue;
    }
}
