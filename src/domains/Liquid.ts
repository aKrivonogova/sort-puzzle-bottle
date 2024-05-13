export enum liquidColors {
    RED = "red",
    YELLOW = "yellow",
    GREEN = "green",
    BLUE = "blue",
    VIOLET = "violet",
    PINK = "pink",
};

export default class Liquid {
    private color: liquidColors;

    constructor(color: liquidColors = liquidColors.RED) {
        this.color = color;
    }

    public setColor(color: liquidColors): void {
        this.color = color;
    }

    public getColor(): liquidColors {
        return this.color;
    }
};