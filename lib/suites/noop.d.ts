export declare const noopSuite: ({ initState }: {
    initState: any;
}) => {
    name: string;
    benchmarks: {
        name: string;
        bench(): () => void;
    }[];
};
