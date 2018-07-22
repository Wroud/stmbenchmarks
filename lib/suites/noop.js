"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noopSuite = ({ initState }) => ({
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
                    store = Object.assign({}, store, { scope: Object.assign({}, store.scope, { counter: 1 }) });
                };
            }
        }
    ]
});
//# sourceMappingURL=noop.js.map