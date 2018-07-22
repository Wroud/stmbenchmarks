export interface IBenchHandlers {
    bench: () => void;
    onComplete?: () => void;
}
export interface IBench {
    name: string;
    bench: () => IBenchHandlers;
}
export interface ISuite {
    name: string;
    benchmarks: IBench[];
}
export interface IMappedOptions {
    [key: string]: any
}
export interface IOptions<
    TVariables extends IMappedOptions,
    THelpers extends IMappedOptions,
    TStates extends IMappedOptions
    > {
    variables: TVariables;
    helpers: THelpers;
    initState: TStates;
}
export type SuiteCreator<
    TVariables extends IMappedOptions,
    THelpers extends IMappedOptions,
    TStates extends IMappedOptions,
    T extends ISuite
    > = (options: IOptions<TVariables, THelpers, TStates>) => T;