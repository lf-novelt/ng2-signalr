export declare class ConnectionStatus {
    private static names;
    private _value;
    readonly value: number;
    readonly name: string;
    constructor(value: number);
    toString(): string;
    equals(other: ConnectionStatus): boolean;
}
