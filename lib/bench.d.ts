import { IOptions, IMappedOptions, SuiteCreator } from "./interfaces";
import { optionsDefault } from "./options";
export declare function runBenchmark<TVariables extends IMappedOptions = typeof optionsDefault.variables, THelpers extends IMappedOptions = typeof optionsDefault.helpers, TStates extends IMappedOptions = typeof optionsDefault.initState>(suites: SuiteCreator<TVariables, THelpers, TStates, any>[], options?: IOptions<TVariables, THelpers, TStates>): void;
