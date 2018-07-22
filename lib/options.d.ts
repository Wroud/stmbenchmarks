import { INormalizedState, IDeepCounterState, ICounterState } from "./interfaces/IState";
export declare const initCounterStore: ICounterState;
export declare const deepState: IDeepCounterState;
export declare const initNormalizedState: INormalizedState;
export declare const optionsDefault: {
    variables: {
        normalizedCount: number;
    };
    helpers: {
        createHeavySubscriber: () => {
            getSubscriberCalls: () => number;
            heavySubscriber: () => any;
        };
    };
    initState: {
        counter: ICounterState;
        deepCounter: IDeepCounterState;
        normalized: INormalizedState;
    };
};
