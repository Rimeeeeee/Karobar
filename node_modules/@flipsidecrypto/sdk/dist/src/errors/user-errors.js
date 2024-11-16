"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class UserError extends base_error_1.BaseError {
    constructor(statusCode, message) {
        const errorType = error_types_1.ERROR_TYPES.user_error;
        super(`${errorType}: user error occured with statusCode: ${statusCode} and msg: '${message}'
      `);
        this.errorType = errorType;
    }
}
exports.UserError = UserError;
//# sourceMappingURL=user-errors.js.map