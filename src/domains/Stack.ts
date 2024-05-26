export default class Stack<T> {
    private values: T[] = [];

    constructor(values: T[] = []) {
        this.values = values;
    }

    protected push(value: T): void {
        this.values.unshift(value);
    }

    protected pop(): T | undefined {
        return this.values.shift();
    }

    protected setValues(values: T[]): void {
        this.values = values;
    }

    public getValues(): T[] {
        return this.values;
    }

    public getSize(): number {
        return this.values.length;
    }

    public getFirstValue(): T {
        return this.values[0];
    }

}