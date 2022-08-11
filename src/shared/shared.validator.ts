import { CustomException } from './shared.exception';
import { z } from 'nestjs-zod/z';
import { BadRequestException } from '@nestjs/common';

export interface IValidator<T> {
    validate(): ValidationResume<T>;
}

export class SchemaValidator {
    constructor(private schema: z.Schema) {}

    validate(value: any) {
        const validation = this.schema.safeParse(value);
        if (validation.success === true) return validation.data;
        else {
            throw new BadRequestException(validation.error.errors);
        }
    }
}

export abstract class Validator<T> implements IValidator<T> {
    public value: T;

    public constructor(value?: T) {
        this.value = value;
    }

    public validate(...validators): ValidationResume<T> {
        return new ValidationResume<T>(
            validators.filter((x) => x instanceof CustomException<T>) as CustomException<T>[]
        );
    }
}

export class ValidationResume<T> {
    public IsValid: boolean;

    constructor(public errors: CustomException<T>[]) {
        this.IsValid = this.checkIsValid();
    }

    private checkIsValid(): boolean {
        return this.errors.length === 0;
    }
}
