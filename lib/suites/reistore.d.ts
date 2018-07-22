export declare const reistoreSuite: ({ variables: { normalizedCount }, initState, helpers: { createHeavySubscriber } }: {
    variables: {
        normalizedCount: any;
    };
    initState: any;
    helpers: {
        createHeavySubscriber: any;
    };
}) => {
    name: string;
    after(): void;
    benchmarks: {
        name: string;
        bench(): () => void;
    }[];
};
