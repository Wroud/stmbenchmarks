"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const reselect_1 = require("reselect");
const reduxReducers_1 = require("./reduxReducers");
exports.reduxSuite = ({ variables: { normalizedCount }, initState, helpers: { createHeavySubscriber } }) => {
    const initStore = reducer => {
        const store = redux_1.createStore(reducer);
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
                        const store = redux_1.createStore((d = undefined) => d);
                        store.subscribe(() => { });
                        const action = { type: "any" };
                    };
                }
            },
            {
                name: "modify",
                bench() {
                    const store = initStore(reduxReducers_1.modifyReducer(initState.counter));
                    return () => store.dispatch({ type: "init" });
                }
            },
            {
                name: "counter",
                bench() {
                    const store = initStore(reduxReducers_1.counterReducer(initState.counter));
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
                    const store = initStore(reduxReducers_1.deepCounterReducer);
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
                    const store = initStore(reduxReducers_1.normalizedReducer(initState.normalized));
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
                    const store = redux_1.createStore(reduxReducers_1.normalizedReducer(initState.normalized));
                    const { heavySubscriber } = createHeavySubscriber();
                    const add = id => ({ type: "add", payload: { id, text: "some news text" + id } });
                    const mod = id => ({ type: "modify", payload: { id, text: Math.random().toString() } });
                    const newsSelector = reselect_1.createSelector((state) => state.news, _ => _);
                    for (let i = 0; i < normalizedCount; i++) {
                        store.dispatch(add(i));
                        const itemSelector = reselect_1.createSelector(newsSelector, news => news[i]);
                        const memorizedSubcriber = reselect_1.createSelector(itemSelector, heavySubscriber);
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
//# sourceMappingURL=redux.js.map