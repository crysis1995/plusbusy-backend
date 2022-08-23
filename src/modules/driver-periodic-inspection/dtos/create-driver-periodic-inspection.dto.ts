import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { DriverIdSchema } from '../schemas/driver-id.schema';
import { FromDateSchema } from '../schemas/from-date.schema';
import { NoteSchema } from '../schemas/note.schema';
import { DocumentTypeSchema } from '../schemas/document-type.schema';
import { ToDateSchema } from '../schemas/to-date.schema';

export const CreateDriverPeriodicInspectionDtoScheme = z.object({
    DriverId: DriverIdSchema,
    FromDate: FromDateSchema,
    ToDate: ToDateSchema,
    DocumentType: DocumentTypeSchema,
    Note: NoteSchema.optional()
});

export class CreateDriverPeriodicInspectionDto extends createZodDto(
    CreateDriverPeriodicInspectionDtoScheme
) {}
