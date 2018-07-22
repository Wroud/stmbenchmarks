"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeChecker = (impact) => {
    let calls = 0;
    const getCalls = () => calls;
    const subscriber = () => {
        calls++;
    };
    return { getCalls, subscriber };
};
//# sourceMappingURL=helpers.js.map