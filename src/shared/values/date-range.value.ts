import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export const DateRangeSchema = z.object({
    StartDate: z.date(),
    EndDate: z.date()
});

export class DateRange extends createZodDto(DateRangeSchema) {}
