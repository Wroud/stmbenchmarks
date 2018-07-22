export declare const reduxSuite: ({ variables: { normalizedCount }, initState, helpers: { subscribeChecker } }: {
    variables: {
        normalizedCount: any;
    };
    initState: any;
    helpers: {
        subscribeChecker: any;
    };
}) => {
    name: string;
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
