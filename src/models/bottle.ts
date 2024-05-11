export enum ColorsEnum {
    red = 1,
    yellow = 2,
    green = 3,
    blue = 4,
    orange = 5
}

export class Bottle {
    private slotsColors: Array<number> = [];
    private slotsCount: number;

    constructor(slotsCount: number) {
        this.slotsColors = [];
        this.slotsCount = slotsCount;
    }

    addSlotColor(slotColor: number): void {
        if (this.slotsColors.length <= this.slotsCount) {
            this.slotsColors.push(slotColor)
        } else return;
    }

    getLastSlot(): number {
        return this.slotsColors[this.slotsColors.length - 1]
    }

    getSlotsCollors(): Array<number> {
        return this.slotsColors;
    }

    fillAllSlotsWithColors(): void {
        let colorValues = Object.values(ColorsEnum).filter(Number.isInteger) as number[]
        colorValues = colorValues.slice(0, this.slotsCount);
        for (let color of colorValues) {
            this.addSlotColor(color);
        }
    }

    getUpsidedownSlotsColors(): Array<number> {
        return this.slotsColors.reverse();
    }
}