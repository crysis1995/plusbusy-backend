export class BuilderTemplate<T> {
    public value: T;
    constructor(value: T) {
        this.value = value;
    }

    build(): T {
        return this.value;
    }
}
