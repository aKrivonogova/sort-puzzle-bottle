import Liquid, { liquidColors } from "./Liquid";
import Bottle from "./Bottle";

export default class BottleFactory {
    private readonly defaultMaxBottleCapacity: number;// ^
    private readonly defaultMinBottleCapacity: number;// ^

    constructor(defaultMinBottleCapacity: number = 1, defaultMaxBottleCapacity: number = 4) {// ^
        this.defaultMaxBottleCapacity = defaultMaxBottleCapacity;// ^
        this.defaultMinBottleCapacity = defaultMinBottleCapacity;// ^
    }

    private getCurrentLiquidSlotsToFill(): number {
        return Math.floor(Math.random() * (this.defaultMaxBottleCapacity - this.defaultMinBottleCapacity + 1)) + this.defaultMinBottleCapacity as number; // from defaultMinBottleCapacity to defaultMaxBottleCapacity
     }

    private getRandomLiquidColor(): liquidColors {
        const colors = Object.values(liquidColors);
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex] as liquidColors;
    }

    public createBottle(): Bottle<Liquid> {
        const liquidSlotsToFill: number = this.getCurrentLiquidSlotsToFill();
        const liquids: Liquid[] = [];

        for (let i = 0; i < liquidSlotsToFill; i++) {
            liquids.push(new Liquid(this.getRandomLiquidColor()));
         }

        return new Bottle(this.defaultMaxBottleCapacity, liquids);
    }
}

 