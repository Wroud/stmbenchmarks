import { createStore } from "redux";
import { createSelector } from "reselect";
import { counterReducer, deepCounterReducer, modifyReducer, normalizedReducer } from "./reduxReducers";

export const reduxSuite = ({ variables: { normalizedCount, subscriberImpact }, initState, helpers: { createHeavySubscriber } }) => {
    const initStore = reducer => {
        const store = createStore(reducer);
        store.subscribe(() => { });
        return store;
    };
    return {
        name: "redux",
        benchmarks: [
            {
                name: "create",
                bench() {
                    return () => {
                        const store = createStore((d = undefined) => d);
                        store.subscribe(() => { });
                        const action = { type: "any" };
                    };
                }
            },
            {
                name: "modify",
                bench() {
                    const store = initStore(modifyReducer(initState.counter()));
                    return () => store.dispatch({ type: "init" });
                }
            },
            {
                name: "counter",
                bench() {
                    const store = initStore(counterReducer(initState.counter()));
                    return () => {
                        store.dispatch({ type: "INCREMENT" });
                        store.dispatch({ type: "DECREMENT" });
                        store.dispatch({ type: "INCREMENT" });
                        store.dispatch({ type: "DECREMENT" });
                    };
                }
            },
            {
                name: "counter deep",
                bench() {
                    const store = initStore(deepCounterReducer);
                    return () => {
                        store.dispatch({ type: "INCREMENT" });
                        store.dispatch({ type: "DECREMENT" });
                        store.dispatch({ type: "INCREMENT" });
                        store.dispatch({ type: "DECREMENT" });
                        store.getState();
                    };
                }
            },
            {
                name: "normalized",
                bench() {
                    const store = initStore(normalizedReducer(initState.normalized()));
                    return () => {
                        for (let i = 0; i < normalizedCount; i++) {
                            store.dispatch({ type: "add", payload: { id: i, text: "some news text" + i } });
                        }
                        for (let i = normalizedCount - 1; i >= 0; i--) {
                            store.dispatch({ type: "delete", payload: i });
                        }
                    };
                }
            },
            {
                name: "normalized with subscribers",
                bench() {
                    const store = createStore(normalizedReducer(initState.normalized()));
                    const { heavySubscriber } = createHeavySubscriber(subscriberImpact);

                    const add = id => ({ type: "add", payload: { id, text: "some news text" + id } });
                    const mod = id => ({ type: "modify", payload: { id, text: Math.random().toString() } });
                    for (let i = 0; i < normalizedCount; i++) {
                        store.dispatch(add(i));
                        const memorizedSubcriber = createSelector((state: any) => state.news[i], heavySubscriber);
                        store.subscribe(() => memorizedSubcriber(store.getState()));
                    }
                    return () => {
                        for (let i = 0; i < normalizedCount; i++) {
                            store.dispatch(mod(i));
                        }
                    };
                }
            }
        ]
    };
};
