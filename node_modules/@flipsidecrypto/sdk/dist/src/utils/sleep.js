"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linearBackOff = exports.getElapsedLinearSeconds = exports.expBackOff = exports.getElapsedExpSeconds = exports.sleep = void 0;
const time_1 = require("./time");
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
exports.sleep = sleep;
function getExpBackOffSeconds(attempts) {
    return Math.pow(2, attempts);
}
function getLinearBackOffSeconds(attempts, intervalSeconds) {
    return (attempts + 1) * intervalSeconds;
}
function getElapsedExpSeconds(config) {
    if (!config.intervalSeconds) {
        throw new Error("intervalSeconds is required for getElapsedLinearTime");
    }
    let elapsedSeconds = 0;
    for (let i = 0; i < config.attempts; i++) {
        elapsedSeconds += getExpBackOffSeconds(i);
    }
    return elapsedSeconds;
}
exports.getElapsedExpSeconds = getElapsedExpSeconds;
function expBackOff(config) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config.intervalSeconds) {
            throw new Error("intervalSeconds is required for getElapsedLinearTime");
        }
        let elapsedSeconds = getElapsedExpSeconds(config);
        let shouldContinueBackoff = true;
        if (elapsedSeconds / 60 > config.timeoutMinutes) {
            shouldContinueBackoff = false;
            return shouldContinueBackoff;
        }
        const msToSleep = (0, time_1.secToMs)(getExpBackOffSeconds(config.attempts * config.intervalSeconds));
        yield sleep(msToSleep);
        return shouldContinueBackoff;
    });
}
exports.expBackOff = expBackOff;
function getElapsedLinearSeconds(config) {
    if (!config.intervalSeconds) {
        throw new Error("intervalSeconds is required for getElapsedLinearTime");
    }
    let elapsedSeconds = 0;
    for (let i = 0; i < config.attempts; i++) {
        elapsedSeconds += getLinearBackOffSeconds(i, config.intervalSeconds);
    }
    return elapsedSeconds;
}
exports.getElapsedLinearSeconds = getElapsedLinearSeconds;
function linearBackOff(config) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!config.intervalSeconds) {
            throw new Error("intervalSeconds is required for linearBackOff");
        }
        let elapsedSeconds = getElapsedLinearSeconds(config);
        let shouldContinueBackoff = true;
        if (elapsedSeconds / 60 > config.timeoutMinutes) {
            shouldContinueBackoff = false;
            return shouldContinueBackoff;
        }
        const msToSleep = (0, time_1.secToMs)(getLinearBackOffSeconds(config.attempts, config.intervalSeconds));
        yield sleep(msToSleep);
        return shouldContinueBackoff;
    });
}
exports.linearBackOff = linearBackOff;
//# sourceMappingURL=sleep.js.map