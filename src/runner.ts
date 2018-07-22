import { runBenchmark } from "./bench";
import { reistoreSuite, reduxSuite, noopSuite } from "./suites";

runBenchmark([noopSuite, reduxSuite, reistoreSuite])