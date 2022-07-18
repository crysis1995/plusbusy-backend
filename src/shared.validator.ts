export class Validator<T> {
    public value: T;
    public throwError: boolean;

    constructor(value?: T, throwError: boolean = false) {
        this.value = value;
        this.throwError = throwError;
    }
}