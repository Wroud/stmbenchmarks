export const subscribeChecker = (impact: number) => {
    let calls = 0;
    const getCalls = () => calls;
    const subscriber = () => {
        calls++;
    };

    return { getCalls, subscriber };
};