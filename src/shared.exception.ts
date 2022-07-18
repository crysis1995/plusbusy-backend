import { Validator } from './shared.validator';

/*
 *   Custom Exception
 *
 * */
export class CustomException<T> extends Error {
    public Object: T;
    public args: any[];

    constructor(obj: T, args: any[] = undefined) {
        super();
        this.Object = obj;
        this.args = args;
        this.message = this.getMessage();
    }

    getMessage() {
        return 'Exception!';
    }
}

/*
 *       Decorator
 *      Throw passed error if result is falsy
 * */
export const ThrowException = (exception: typeof CustomException<Object>) => {
    return (
        target: Object,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            const that: Validator<Object> = this;
            const result = originalMethod.apply(that, args);
            if (that?.throwError && !result)
                throw new exception(that.value, args);
            return result;
        };
    };
};
