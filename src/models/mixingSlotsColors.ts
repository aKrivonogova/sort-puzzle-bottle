import { Bottle } from './bottle'
import { ColorsEnum } from './bottle';

export class MixingSlotsColors {
    private bottlesList: Bottle[] = [];
    private slotsCount: number;

    constructor(bottlesCount: number, slotsCount: number) {
        this.slotsCount = slotsCount;
        for (let indexBottom = 0; indexBottom <= bottlesCount; indexBottom++) {
            let bottle = new Bottle(slotsCount);
            bottle.setSlotsColors(this.getCurrentNumberColors());
            bottle.getUpsidedownSlotsColors();
            this.bottlesList.push(bottle);
        }
    }

    getCurrentNumberColors(): Array<number> {
        return Object.values(ColorsEnum).filter(Number.isInteger).slice(0, this.slotsCount) as number[]
    }

    getBottlesList(): Array<Bottle> {
        return this.bottlesList;
    }
    
}