// classes -> "domains" folder

import Liquid, { liquidColors } from "./Liquid";
import Stack from "./Stack";
const { DEFAULT_BOTTLE_CAPACITY = 4 as number } = import.meta.env;

export default class Bottle<T> extends Stack<T> {
    private readonly capacity: number;// ^
    constructor(capacity: number = DEFAULT_BOTTLE_CAPACITY, values: T[] = []) {
        super();
        this.capacity = capacity;
        this.setValues(values);
    }

    public pour(value: T): void {
        if (this.getSize() === this.capacity) {
            throw new Error("Cannot pour anymore!")
        }
        this.push(value);
    }
}

// to BF
