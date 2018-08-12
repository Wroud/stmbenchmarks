export const subscribeChecker = () => {
    let calls = 0;
    const getCalls = () => calls;
    const subscriber = () => {
        calls++;
    };

    return { getCalls, subscriber };
};