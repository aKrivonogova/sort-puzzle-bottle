export default class IdService {
    public static getUniqueId(): string {
        return `${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}`;
    }

    private static s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}
