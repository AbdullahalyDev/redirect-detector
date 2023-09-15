"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
class UrlHelpers {
    static isUrl(url) {
        try {
            const Url = new URL(url);
            return (0, lodash_1.default)(Url).pick([
                "host",
                "hostname",
                "href",
                "pathname",
                "protocol",
                "port",
            ]);
        }
        catch (_a) {
            return false;
        }
    }
}
exports.default = UrlHelpers;
