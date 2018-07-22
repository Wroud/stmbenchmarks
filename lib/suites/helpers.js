"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHeavySubscriber = () => {
    let calls = 0;
    const getSubscriberCalls = () => calls;
    const heavySubscriber = () => {
        calls++;
        return new Array(50).fill(Math.random()).reduce((acc, v) => acc + v + Math.random());
    };
    return { getSubscriberCalls, heavySubscriber };
};
//# sourceMappingURL=helpers.js.map