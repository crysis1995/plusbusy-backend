import { CustomException } from './shared.exception';

export interface IValidator<T> {
    validate(): ValidationResume<T>;
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
