import { Bottle } from './bottle'

export enum ColorsEnum {
    red = 1,
    yellow = 2,
    green = 3,
    blue = 4,
    orange = 5
}

export class MixingSlotsColors {
    private bottlesList: Bottle[] = [];
    private slotsCount: number;

    constructor(bottlesCount: number, slotsCount: number) {
        this.slotsCount = slotsCount;
        for (let indexBottle = 0; indexBottle <= bottlesCount; indexBottle++) {
            let bottleObject = new Bottle(slotsCount);
            bottleObject.setSlotsColors(this.getCurrentNumberColors());
            this.bottlesList.push(bottleObject);
        }
        this.splitCollection(this.slotsCount, this.shufleCompletedCollectionColors());
    }

    getCurrentNumberColors(): Array<number> {
        return Object.values(ColorsEnum).filter(Number.isInteger).slice(0, this.slotsCount) as number[]
    }

    getBottlesList(): Array<Bottle> {
        return this.bottlesList;
    }

    createCompleteCollectionColors(): Array<number> {
        let completeCollectionColors: Array<number> = [];
        for (let itemCollectionColors in this.getBottlesList()) {
            completeCollectionColors.push(...this.bottlesList[itemCollectionColors].getSlotsCollors());
        }
        return completeCollectionColors;
    }

    shufleCompletedCollectionColors():Array<number> {
        const shuffledCollectionColors = this.createCompleteCollectionColors().slice();
        for (let itemColor = shuffledCollectionColors.length - 1; itemColor > 0; itemColor--) {
            const randomColorValue = Math.floor(Math.random() * (itemColor + 1));
            [shuffledCollectionColors[itemColor], shuffledCollectionColors[randomColorValue]] = [shuffledCollectionColors[randomColorValue], shuffledCollectionColors[itemColor]];
        }
        return shuffledCollectionColors;
    }

    splitCollection(chunkSize: number, collection: Array<any>): void {
        for (let itemCollectionColors in this.getBottlesList()) {
            for (let itemColor = 0; itemColor < collection.length; itemColor += chunkSize) {
                let localCollection: Array<number> = collection.slice(itemColor, itemColor + chunkSize);
                console.log(localCollection)
                this.getBottlesList()[itemCollectionColors].setSlotsColors(localCollection);
            }
        }
    }
}