export function generateObjectWithoutUndefinedValues(value: Object) {
    return Object.keys(value).reduce<{
        [key: string]: any;
    }>((prev, acc) => {
        if (value[acc] !== undefined) {
            prev[acc] = value[acc];
        }
        return prev;
    }, {});
}
