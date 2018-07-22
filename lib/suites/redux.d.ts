export declare const reduxSuite: ({ variables: { normalizedCount }, initState, helpers: { createHeavySubscriber } }: {
    variables: {
        normalizedCount: any;
    };
    initState: any;
    helpers: {
        createHeavySubscriber: any;
    };
}) => {
    name: string;
    benchmarks: {
        name: string;
        bench(): () => void;
    }[];
};
