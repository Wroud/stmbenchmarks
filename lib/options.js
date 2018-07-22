"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suites_1 = require("./suites");
exports.initCounterStore = () => ({
    scope: {
        counter: 0
    }
});
exports.deepState = () => ({
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
exports.initNormalizedState = () => ({
    news: {},
    show: []
});
exports.optionsDefault = {
    variables: {
        normalizedCount: 5
    },
    helpers: {
        createHeavySubscriber: suites_1.createHeavySubscriber
    },
    initState: {
        counter: exports.initCounterStore,
        deepCounter: exports.deepState,
        normalized: exports.initNormalizedState
    }
};
//# sourceMappingURL=options.js.map