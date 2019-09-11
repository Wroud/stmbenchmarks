import { runBenchmark } from "./bench";
import { reistoreSuite, reduxSuite, noopSuite, reatomSuite } from "./suites";

runBenchmark([noopSuite, reduxSuite, reistoreSuite, reatomSuite])