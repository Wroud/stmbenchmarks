export declare const series: (arr: any, delay: any, iterator: any, done: any) => void;
export declare const color: (str: any, color: any) => string;
export declare const highlight: (str: any, color: any) => string;
export declare const padAfter: (str: any, width: any) => string;
export declare const padBefore: (str: any, width: any) => string;
export declare const humanize: (n: any) => any;
export declare const cursor: {
    hide: () => void;
    show: () => void;
    deleteLine: () => void;
    beginningOfLine: () => void;
    CR: () => void;
};
