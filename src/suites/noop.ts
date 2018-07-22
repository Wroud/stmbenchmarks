export const noopSuite = ({ initState }) => ({
    name: "immutable noop",
    benchmarks: [
        {
            name: "create",
            bench() {
                return () => {
                    const store = {
                        scope: {
                            counter: 0
                        }
                    };
                };
            }
        },
        {
            name: "modify",
            bench() {
                let store = initState.counter;
                return () => {
                    store = {
                        ...store,
                        scope: {
                            ...store.scope,
                            counter: 1
                        }
                    };
                };
            }
        }
    ]
});
