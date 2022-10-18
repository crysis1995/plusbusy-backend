import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { BuilderTemplate } from '../shared.types';

export const DateRangeSchema = z.object({
    StartDate: z.date(),
    EndDate: z.date()
});

export class DateRange extends createZodDto(DateRangeSchema) {}

export class DateRangeBuilder extends BuilderTemplate<DateRange> {
    constructor() {
        super(new DateRange());
    }

    setStartDate(value: Date) {
        if (value) {
            this.value.StartDate = value;
        }
        return this;
    }
    setEndDate(value: Date) {
        if (value) {
            this.value.EndDate = value;
        }
        return this;
    }
}
