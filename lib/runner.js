"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bench_1 = require("./bench");
const suites_1 = require("./suites");
bench_1.runBenchmark([suites_1.noopSuite, suites_1.reduxSuite, suites_1.reistoreSuite]);
//# sourceMappingURL=runner.js.map