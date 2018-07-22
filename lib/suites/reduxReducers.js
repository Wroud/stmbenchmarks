"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
exports.modifyReducer = (initCounterStore) => (state = Object.assign({}, initCounterStore)) => (Object.assign({}, state, { scope: Object.assign({}, state.scope, { counter: 1 }) }));
exports.counterReducer = (initCounterStore) => (state = Object.assign({}, initCounterStore), action) => {
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign({}, state, { scope: Object.assign({}, state.scope, { counter: state.scope.counter + 1 }) });
        case 'DECREMENT':
            return Object.assign({}, state, { scope: Object.assign({}, state.scope, { counter: state.scope.counter - 1 }) });
        default:
            return state;
    }
};
exports.dcounterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};
exports.deepCounterReducer = redux_1.combineReducers({
    scope0: redux_1.combineReducers({
        scope1: redux_1.combineReducers({
            scope2: redux_1.combineReducers({
                scope3: redux_1.combineReducers({
                    scope4: redux_1.combineReducers({
                        counter: exports.dcounterReducer
                    })
                })
            })
        })
    })
});
exports.normalizedReducer = (initNormalizedState) => (state = Object.assign({}, initNormalizedState), action) => {
    switch (action.type) {
        case 'add':
            return Object.assign({}, state, { news: Object.assign({}, state.news, { [action.payload.id]: action.payload }), show: [...state.show, action.payload.id] });
        case 'modify':
            return Object.assign({}, state, { news: Object.assign({}, state.news, { [action.payload.id]: Object.assign({}, state.news[action.payload.id], { text: action.payload.text }) }) });
        case 'delete':
            const _a = state.news, _b = action.payload, _ = _a[_b], newNews = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return Object.assign({}, state, { news: newNews, show: state.show.filter(id => id !== action.payload) });
        default:
            return state;
    }
};
//# sourceMappingURL=reduxReducers.js.map