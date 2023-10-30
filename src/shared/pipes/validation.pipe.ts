import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { z } from 'nestjs-zod/z';

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(private schema: z.Schema) {}
    transform(value: any, metadata: ArgumentMetadata): any {
        const validation = this.schema.safeParse(value);
        if (validation.success === true) return validation.data;

        throw new BadRequestException(validation.error.errors);
    }
}
