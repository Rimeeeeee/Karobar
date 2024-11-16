"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedSDKError = void 0;
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class UnexpectedSDKError extends base_error_1.BaseError {
    constructor(message) {
        const errorType = error_types_1.ERROR_TYPES.sdk_error;
        super(`${errorType}: ${message}`);
        this.errorType = errorType;
    }
}
exports.UnexpectedSDKError = UnexpectedSDKError;
//# sourceMappingURL=sdk-errors.js.map