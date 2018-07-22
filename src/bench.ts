import { Suite } from "benchmark";
import { reporter } from "./benchmark/reporter";
import { IOptions, IMappedOptions, SuiteCreator } from "./interfaces";
import { optionsDefault } from "./options";

export function runBenchmark<
    TVariables extends IMappedOptions = typeof optionsDefault.variables,
    THelpers extends IMappedOptions = typeof optionsDefault.helpers,
    TStates extends IMappedOptions = typeof optionsDefault.initState
    >(suites: SuiteCreator<TVariables, THelpers, TStates, any>[], options: IOptions<TVariables, THelpers, TStates> = optionsDefault as any) {
    for (const s of suites) {
        const su = s(options);
        var bench = new Suite(su.name, {
            delay: 0,
            maxTime: 1,
            initCount: 0
        });
        reporter(bench);
        bench.on('error', event => {
            console.log(event);
        });
        for (const b of su.benchmarks) {
            const initBench = b.bench()
            bench.add({
                name: b.name,
                fn: typeof initBench === "function"
                    ? initBench
                    : initBench.bench
            });
            if (initBench.onComplete) {
                bench.on("complete", initBench.onComplete);
            }
        }
        bench.run();
    }
}