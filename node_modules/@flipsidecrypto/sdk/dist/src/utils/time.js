"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secToMs = exports.msToSec = exports.minToMs = exports.msToMin = void 0;
function msToMin(ms) {
    return ms / 1000 / 60;
}
exports.msToMin = msToMin;
function minToMs(min) {
    return min * 60 * 1000;
}
exports.minToMs = minToMs;
function msToSec(ms) {
    return ms / 1000;
}
exports.msToSec = msToSec;
function secToMs(sec) {
    return sec * 1000;
}
exports.secToMs = secToMs;
//# sourceMappingURL=time.js.map