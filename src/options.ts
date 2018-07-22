import { INormalizedState, IDeepCounterState, ICounterState } from "./interfaces/IState";
import { subscribeChecker } from "./suites";

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
        normalizedCount: 5
    },
    helpers: {
        subscribeChecker
    },
    initState: {
        counter: initCounterStore,
        deepCounter: deepState,
        normalized: initNormalizedState
    }
};