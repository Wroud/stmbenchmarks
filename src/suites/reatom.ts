import {
    declareAction,
    declareAtom,
    map,
    combine,
    createStore,
} from '@reatom/core'
import { createSelector } from "reselect";

export const reatomSuite = ({ variables: { normalizedCount }, initState, helpers: { subscribeChecker } }) => {
    const initStore = (init, dependency) => {
        const counter = declareAtom(0, dependency)

        const store = createStore(counter, init)
        store.subscribe(counter, () => { });
        return store;
    };
    return {
        name: "reatom",
        benchmarks: [
            {
                name: "create",
                bench() {
                    const action = declareAction();
                    const counter = declareAtom(
                        0,
                        reduce => [reduce(action, state => state + 1)],
                    );
                    return () => {
                        const store = createStore(counter);
                        store.subscribe(counter, () => { });
                    };
                }
            },
            {
                name: "modify",
                bench() {
                    const action = declareAction()
                    const store = initStore(initState.counter(), reduce => [reduce(action, state => state + 1)]);
                    return () => store.dispatch(action()); // any action
                }
            },
            {
                name: "counter",
                bench() {
                    const increment = declareAction()
                    const decrement = declareAction()
                    const store = initStore(initState.counter(), reduce => [
                        reduce(increment, state => state + 1),
                        reduce(decrement, state => state - 1)
                    ]);
                    return () => {
                        store.dispatch(increment());
                        store.dispatch(decrement());
                        store.dispatch(increment());
                        store.dispatch(decrement());
                    };
                }
            },
            {
                name: "counter deep",
                bench() {
                    const increment = declareAction()
                    const decrement = declareAction()
                    const counter = declareAtom(0, reduce => [
                        reduce(increment, state => state + 1),
                        reduce(decrement, state => state - 1)
                    ]);

                    const deep = combine({
                        scope0: combine({
                            scope1: combine({
                                scope2: combine({
                                    scope3: combine({
                                        scope4: combine({
                                            counter
                                        })
                                    })
                                })
                            })
                        })
                    });
                    const store = createStore(deep, initState.deepCounter())
                    store.subscribe(counter, () => { });

                    return () => {
                        store.dispatch(increment());
                        store.dispatch(decrement());
                        store.dispatch(increment());
                        store.dispatch(decrement());
                        store.getState(deep);
                    };
                }
            },
            {
                name: "normalized",
                bench() {
                    const add = declareAction<any>()
                    const del = declareAction<number>()
                    const show = declareAtom([], reduce => [
                        reduce(add, (state, payload) => [...state, payload.id]),
                        reduce(del, (state, payload) => state.filter(id => id !== payload))
                    ]);
                    const news = declareAtom({} as any, reduce => [
                        reduce(add, (state, payload) => ({ ...state, [payload.id]: payload })),
                        reduce(del, (state, payload) => {
                            const { [payload]: _, ...newNews } = state;
                            return newNews;
                        })
                    ]);
                    const normalized = combine({ show, news });
                    const store = createStore(normalized, initState.normalized());
                    store.subscribe(() => { });
                    return () => {
                        for (let i = 0; i < normalizedCount; i++) {
                            store.dispatch(add({ id: i, text: "some news text" + i }));
                        }
                        for (let i = normalizedCount - 1; i >= 0; i--) {
                            store.dispatch(del(i));
                        }
                    };
                }
            },
            {
                name: "normalized with subscribers",
                bench() {
                    const add = declareAction<any>()
                    const mod = declareAction<any>()
                    const del = declareAction<number>()
                    const show = declareAtom([], reduce => [
                        reduce(add, (state, payload) => [...state, payload.id]),
                        reduce(del, (state, payload) => state.filter(id => id !== payload))
                    ]);
                    const news = declareAtom({} as any, reduce => [
                        reduce(add, (state, payload) => ({ ...state, [payload.id]: payload })),
                        reduce(mod, (state, payload) => ({
                            ...state,
                            [payload.id]: {
                                ...state[payload.id],
                                text: payload.text
                            }
                        })),
                        reduce(del, (state, payload) => {
                            const { [payload]: _, ...newNews } = state;
                            return newNews;
                        })
                    ]);
                    const normalized = combine({ show, news });
                    const store = createStore(normalized, initState.normalized());
                    store.subscribe(() => { });

                    const { subscriber, getCalls } = subscribeChecker();

                    const addC = id => ({ id, text: "some news text" + id });
                    const modC = id => ({ id, text: Math.random().toString() });
                    for (let i = 0; i < normalizedCount; i++) {
                        store.dispatch(add(addC(i)));
                        store.subscribe(map(news, s => s[i]), subscriber);
                    }
                    let invokeCount = 0;
                    return {
                        bench: () => {
                            for (let i = 0; i < normalizedCount; i++) {
                                store.dispatch(mod(modC(i)));
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
