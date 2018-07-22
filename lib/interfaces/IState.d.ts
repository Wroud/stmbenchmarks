export interface ICounterState {
    scope: {
        counter: number;
    };
}
export interface IDeepCounterState {
    scope0: {
        scope1: {
            scope2: {
                scope3: {
                    scope4: {
                        counter: number;
                    };
                };
            };
        };
    };
}
export interface INews {
    id: number;
    text: string;
}
export interface INormalizedState {
    news: {
        [key: number]: INews;
    };
    show: number[];
}
