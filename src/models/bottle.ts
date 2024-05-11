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
        if (slotsCount >= 0) {
            this.slotsCount = slotsCount;
        } else throw new Error('Количество слотов не может быть отрицательным');

    }

    addSlotColor(slotColor: number): void {
        if (this.slotsColors.length <= this.slotsCount) {
            this.slotsColors.push(slotColor)
        } else throw new Error('Бутылка переполнена');
    }

    getLastSlot(): number {
        return this.slotsColors[this.slotsColors.length - 1]
    }

    getSlotsCollors(): Array<number> {
        return this.slotsColors;
    }

    setSlotsColors(slotsColors: Array<number>): any {
        this.slotsColors = slotsColors;
    }

    getUpsidedownSlotsColors(): void {
        this.slotsColors.reverse();
    }
}