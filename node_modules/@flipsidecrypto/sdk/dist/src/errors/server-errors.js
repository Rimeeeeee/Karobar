"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const base_error_1 = require("./base-error");
const error_types_1 = require("./error-types");
class ServerError extends base_error_1.BaseError {
    constructor(statusCode, message) {
        const errorType = error_types_1.ERROR_TYPES.server_error;
        super(`${errorType}: an unexpected server error occured with statusCode: ${statusCode} and msg: '${message}'
      `);
        this.errorType = errorType;
    }
}
exports.ServerError = ServerError;
//# sourceMappingURL=server-errors.js.map