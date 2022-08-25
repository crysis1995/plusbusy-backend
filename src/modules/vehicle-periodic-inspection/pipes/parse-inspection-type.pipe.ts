import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { VehicleInspectionTypeEnum } from '../enums/vehicle-inspection-type.enum';

@Injectable()
export class ParseInspectionTypePipe implements PipeTransform<string, VehicleInspectionTypeEnum> {
    transform(value: string, metadata: ArgumentMetadata): VehicleInspectionTypeEnum {
        const data = VehicleInspectionTypeEnum[value];
        if (!data) {
            throw new BadRequestException(
                `Expected one of value: [${Object.keys(VehicleInspectionTypeEnum).join(', ')}]`
            );
        }
        return data;
    }
}
