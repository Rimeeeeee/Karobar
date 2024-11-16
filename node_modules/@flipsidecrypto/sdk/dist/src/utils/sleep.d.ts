import { SleepConfig } from "../types/sleep-config.type";
export declare function sleep(ms: number): Promise<undefined>;
export declare function getElapsedExpSeconds(config: SleepConfig): number;
export declare function expBackOff(config: SleepConfig): Promise<boolean>;
export declare function getElapsedLinearSeconds(config: SleepConfig): number;
export declare function linearBackOff(config: SleepConfig): Promise<boolean>;
//# sourceMappingURL=sleep.d.ts.map