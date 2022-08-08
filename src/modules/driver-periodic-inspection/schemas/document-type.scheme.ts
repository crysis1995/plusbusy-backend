import { z } from 'nestjs-zod/z';
import { DriverPeriodicInspectionDocumentTypeEnum } from '../enums/driver-periodic-inspection-document-type.enum';

export const DocumentTypeScheme = z.nativeEnum(DriverPeriodicInspectionDocumentTypeEnum)