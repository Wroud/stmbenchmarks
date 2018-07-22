"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const benchmark_1 = require("benchmark");
const reporter_1 = require("./benchmark/reporter");
const options_1 = require("./options");
function runBenchmark(suites, options = options_1.optionsDefault) {
    for (const s of suites) {
        const su = s(options);
        var bench = new benchmark_1.Suite(su.name, {
            delay: 0,
            maxTime: 1,
            initCount: 0
        });
        reporter_1.reporter(bench);
        bench.on('error', event => {
            console.log(event);
        });
        for (const b of su.benchmarks) {
            const initBench = b.bench();
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
exports.runBenchmark = runBenchmark;
//# sourceMappingURL=bench.js.map