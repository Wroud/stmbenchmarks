"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function reporter(suite) {
    // suite.on('start', function () {
    //   console.log();
    // });
    // suite.on('complete', function (stats) {
    //   console.log();
    //   console.log(color('  Suites:  ', 'gray') + stats.suites);
    //   console.log(color('  Benches: ', 'gray') + stats.benches);
    //   console.log(color('  Elapsed: ', 'gray') + humanize(stats.elapsed.toFixed(2)) + ' ms');
    //   console.log();
    // });
    suite.on('start', function (suite) {
        console.log(utils_1.padBefore('', 23) + suite.currentTarget.name);
    });
    suite.on('complete', function (suite) {
        console.log();
    });
    // suite.on('cycle', function (bench) {
    //   process.stdout.write('\r' + color(padBefore('wait » ', 25), 'yellow')
    //                             + color(bench.title, 'gray'));
    // });
    suite.on('cycle', function (results) {
        //   cursor.CR();
        var ops = utils_1.humanize(results.target.hz.toFixed(0));
        console.log(utils_1.color(utils_1.padBefore(ops + ' op/s', 22), 'cyan')
            + utils_1.color(' » ' + results.target.name, 'gray'));
    });
}
exports.reporter = reporter;
;
//# sourceMappingURL=reporter.js.map