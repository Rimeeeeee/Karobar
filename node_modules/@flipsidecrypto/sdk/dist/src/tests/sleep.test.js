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
const vitest_1 = require("vitest");
const sleep_1 = require("../utils/sleep");
(0, vitest_1.describe)("getElapsedLinearSeconds", () => {
    (0, vitest_1.it)("1 attempt", () => {
        const config = {
            attempts: 1,
            timeoutMinutes: 5,
            intervalSeconds: 5,
        };
        const elapsed = (0, sleep_1.getElapsedLinearSeconds)(config);
        vitest_1.assert.equal(elapsed, 5);
    });
    (0, vitest_1.it)("2 attempts", () => {
        const config = {
            attempts: 2,
            timeoutMinutes: 5,
            intervalSeconds: 5,
        };
        const elapsed = (0, sleep_1.getElapsedLinearSeconds)(config);
        vitest_1.assert.equal(elapsed, 15);
    });
    (0, vitest_1.it)("3 attempts", () => {
        const config = {
            attempts: 3,
            timeoutMinutes: 5,
            intervalSeconds: 5,
        };
        const elapsed = (0, sleep_1.getElapsedLinearSeconds)(config);
        vitest_1.assert.equal(elapsed, 30);
    });
});
(0, vitest_1.describe)("linearBackOff", () => {
    (0, vitest_1.it)("should continue", () => __awaiter(void 0, void 0, void 0, function* () {
        const config = {
            attempts: 1,
            timeoutMinutes: 5,
            intervalSeconds: 0.1,
        };
        const shouldContinue = yield (0, sleep_1.linearBackOff)(config);
        vitest_1.assert.equal(shouldContinue, true);
    }));
    (0, vitest_1.it)("should stop", () => __awaiter(void 0, void 0, void 0, function* () {
        const config = {
            attempts: 1,
            timeoutMinutes: 0.0001,
            intervalSeconds: 0.1,
        };
        const shouldContinue = yield (0, sleep_1.linearBackOff)(config);
        vitest_1.assert.equal(shouldContinue, false);
    }));
});
(0, vitest_1.describe)("getElapsedExpSeconds", () => {
    (0, vitest_1.it)("1 attempt", () => {
        const config = {
            attempts: 1,
            timeoutMinutes: 5,
            intervalSeconds: 5,
        };
        const elapsed = (0, sleep_1.getElapsedExpSeconds)(config);
        vitest_1.assert.equal(elapsed, 1);
    });
    (0, vitest_1.it)("2 attempts", () => {
        const config = {
            attempts: 2,
            timeoutMinutes: 5,
            intervalSeconds: 5,
        };
        const elapsed = (0, sleep_1.getElapsedExpSeconds)(config);
        vitest_1.assert.equal(elapsed, 3);
    });
    (0, vitest_1.it)("3 attempts", () => {
        const config = {
            attempts: 3,
            timeoutMinutes: 5,
            intervalSeconds: 5,
        };
        const elapsed = (0, sleep_1.getElapsedExpSeconds)(config);
        vitest_1.assert.equal(elapsed, 7);
    });
});
(0, vitest_1.describe)("expBackOff", () => {
    (0, vitest_1.it)("should continue", () => __awaiter(void 0, void 0, void 0, function* () {
        const config = {
            attempts: 1,
            timeoutMinutes: 5,
            intervalSeconds: 0.1,
        };
        const shouldContinue = yield (0, sleep_1.expBackOff)(config);
        vitest_1.assert.equal(shouldContinue, true);
    }));
    (0, vitest_1.it)("should stop", () => __awaiter(void 0, void 0, void 0, function* () {
        const config = {
            attempts: 1,
            timeoutMinutes: 0.0001,
            intervalSeconds: 0.1,
        };
        const shouldContinue = yield (0, sleep_1.expBackOff)(config);
        vitest_1.assert.equal(shouldContinue, false);
    }));
});
//# sourceMappingURL=sleep.test.js.map