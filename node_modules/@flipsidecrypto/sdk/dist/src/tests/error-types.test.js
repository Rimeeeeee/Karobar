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
const error_types_1 = require("../errors/error-types");
(0, vitest_1.describe)("error type checks", () => {
    (0, vitest_1.it)("ERROR_TYPES.default === GENERIC_FLIPSIDE_ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.assert.equal(error_types_1.ERROR_TYPES.default, "GENERIC_FLIPSIDE_ERROR");
    }));
    (0, vitest_1.it)("ERROR_TYPES.sdk_error === UNEXPECTED_SDK_ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.assert.equal(error_types_1.ERROR_TYPES.sdk_error, "UNEXPECTED_SDK_ERROR");
    }));
    (0, vitest_1.it)("ERROR_TYPES.server_error === SERVER_ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.assert.equal(error_types_1.ERROR_TYPES.server_error, "SERVER_ERROR");
    }));
    (0, vitest_1.it)("ERROR_TYPES.query_run_rate_limit_error === QUERY_RUN_RATE_LIMIT_ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.assert.equal(error_types_1.ERROR_TYPES.query_run_rate_limit_error, "QUERY_RUN_RATE_LIMIT_ERROR");
    }));
    (0, vitest_1.it)("ERROR_TYPES.query_run_timeout_error === QUERY_RUN_TIMEOUT_ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.assert.equal(error_types_1.ERROR_TYPES.query_run_timeout_error, "QUERY_RUN_TIMEOUT_ERROR");
    }));
    (0, vitest_1.it)("ERROR_TYPES.query_run_execution_error === QUERY_RUN_EXECUTION_ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.assert.equal(error_types_1.ERROR_TYPES.query_run_execution_error, "QUERY_RUN_EXECUTION_ERROR");
    }));
    (0, vitest_1.it)("ERROR_TYPES.user_error === USER_ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.assert.equal(error_types_1.ERROR_TYPES.user_error, "USER_ERROR");
    }));
});
//# sourceMappingURL=error-types.test.js.map