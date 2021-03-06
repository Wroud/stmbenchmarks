import { createStore } from "redux";
import { createSelector } from "reselect";
import { counterReducer, deepCounterReducer, modifyReducer, normalizedReducer } from "./reduxReducers";

export const reduxSuite = ({ variables: { normalizedCount }, initState, helpers: { subscribeChecker } }) => {
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
                    return () => store.dispatch({ type: "modify" }); // any action
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
                    const { subscriber, getCalls } = subscribeChecker();

                    const add = id => ({ type: "add", payload: { id, text: "some news text" + id } });
                    const mod = id => ({ type: "modify", payload: { id, text: Math.random().toString() } });
                    for (let i = 0; i < normalizedCount; i++) {
                        store.dispatch(add(i));
                        const memorizedSubcriber = createSelector((state: any) => state.news[i], subscriber);
                        store.subscribe(() => memorizedSubcriber(store.getState()));
                    }
                    let invokeCount = 0;
                    return {
                        bench: () => {
                            for (let i = 0; i < normalizedCount; i++) {
                                store.dispatch(mod(i));
                            }
                            invokeCount += normalizedCount;
                        },
                        onComplete: () => {
                            if (getCalls() < invokeCount) {
                                throw new Error(`subscriber called: ${getCalls()}/${invokeCount}`);
                            }
                        }
                    };
                }
            }
        ]
    };
};
