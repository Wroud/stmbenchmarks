export const createHeavySubscriber = (impact: number) => {
    let calls = 0;
    const getSubscriberCalls = () => calls;
    const heavySubscriber = () => {
        calls++;
        let calc;
        for (let i = 0; i < impact; i++) {
            calc = 55 ^ 3;
        }
        return calc;
    };

    return { getSubscriberCalls, heavySubscriber };
};