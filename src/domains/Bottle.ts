import Stack from "./Stack";
import IdService from "./isService";
const { DEFAULT_BOTTLE_CAPACITY = 4 as number } = import.meta.env;

export default class Bottle<T> extends Stack<T> {
    private readonly capacity: number;// ^
    private id: string;
    constructor(capacity: number = DEFAULT_BOTTLE_CAPACITY, values: T[] = []) {
        super();
        this.capacity = capacity;
        this.id = IdService.getUniqueId();
        this.setValues(values);
    }

    public pour(value: T): void {
        if (this.getSize() === this.capacity) {
            return
        }
        this.push(value);
    }

    public pourOut(): T | undefined {
        return this.pop();
    }

    public getId(): string {
        return this.id;
    }

    public isEmptyBottle(): boolean {
        return this.getValues().length === 0;
    }
}

