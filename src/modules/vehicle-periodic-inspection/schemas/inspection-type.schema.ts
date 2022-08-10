import { z } from 'nestjs-zod/z';
import { VehicleInspectionTypeEnum } from '../enums/vehicle-inspection-type.enum';

export const InspectionTypeSchema = z.nativeEnum(VehicleInspectionTypeEnum)