import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { DriverIdScheme } from '../schemas/driver-id.scheme';
import { FromDateScheme } from '../schemas/from-date.scheme';
import { NoteScheme } from '../schemas/note.scheme';
import { DocumentTypeScheme } from '../schemas/document-type.scheme';
import { ToDateScheme } from '../schemas/to-date.scheme';

export const CreateDriverPeriodicInspectionDtoScheme = z.object({
    DriverId: DriverIdScheme,
    FromDate: FromDateScheme,
    ToDate: ToDateScheme,
    DocumentType: DocumentTypeScheme,
    Note: NoteScheme.optional()
});

export class CreateDriverPeriodicInspectionDto extends createZodDto(
    CreateDriverPeriodicInspectionDtoScheme
) {}
