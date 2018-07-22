import { INormalizedState, IDeepCounterState, ICounterState } from "./interfaces/IState";
import { createHeavySubscriber } from "./suites";

export const initCounterStore = (): ICounterState => ({
    scope: {
        counter: 0
    }
});
export const deepState = (): IDeepCounterState => ({
    scope0: {
        scope1: {
            scope2: {
                scope3: {
                    scope4: {
                        counter: 0
                    }
                }
            }
        }
    }
});
export const initNormalizedState = (): INormalizedState => ({
    news: {},
    show: []
});

export const optionsDefault = {
    variables: {
        normalizedCount: 5,
        subscriberImpact: 1000
    },
    helpers: {
        createHeavySubscriber
    },
    initState: {
        counter: initCounterStore,
        deepCounter: deepState,
        normalized: initNormalizedState
    }
};