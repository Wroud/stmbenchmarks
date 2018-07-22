export declare const reistoreSuite: ({ variables: { normalizedCount }, initState, helpers: { subscribeChecker } }: {
    variables: {
        normalizedCount: any;
    };
    initState: any;
    helpers: {
        subscribeChecker: any;
    };
}) => {
    name: string;
    after(): void;
    benchmarks: ({
        name: string;
        bench(): () => void;
    } | {
        name: string;
        bench(): {
            bench: () => void;
            onComplete: () => void;
        };
    })[];
};
