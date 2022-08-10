import { HttpException, HttpStatus } from '@nestjs/common';

/*
 *   Custom Exception
 *
 * */
export class CustomException<T> extends HttpException {
    public Object: T;
    public args: any[];
    protected custom_status: HttpStatus;
    protected custom_message;

    constructor(obj: T, args: any[] = undefined) {
        super('', HttpStatus.BAD_REQUEST);
        this.Object = obj;
        this.args = args;
    }

    getStatus(): number {
        return this.custom_status;
    }

    getResponse(): string | object {
        return this.custom_message;
    }
}

/*
 *       Decorator
 *      Throw passed error if result is falsy
 * */
export const ThrowException = <T extends typeof CustomException<any>>(exception: T) => {
    return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            const result = originalMethod.apply(this, args);
            if (!result) return new exception(this.value, args);
            return result;
        };
    };
};
