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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const lodash_1 = __importDefault(require("lodash"));
const axios_1 = __importDefault(require("axios"));
const colors_1 = __importDefault(require("colors"));
const table_1 = require("table");
const config_1 = __importDefault(require("./config"));
const url_helper_1 = __importDefault(require("./helpers/url.helper"));
const application = commander_1.default.program;
application.name("redirect-detector");
application.description("this project let you check if the url have redirect link");
application.version("0.0.1");
application.argument("url", "url to check it");
application.option("-m --method <method>", "method of request");
application.option("-r --redirects <number>", "number of max redirects", Number.parseInt);
application.action(function (argument, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const url = url_helper_1.default.isUrl(argument);
        if (!url) {
            console.log("invalid url format, may you forgot the proctol");
            return;
        }
        const stream = (0, table_1.createStream)({
            columnCount: 1,
            columnDefault: { width: 62 },
        });
        const request = yield axios_1.default
            .get(argument, {
            method: (_a = options.method) !== null && _a !== void 0 ? _a : config_1.default.method,
            maxRedirects: (_b = options.redirects) !== null && _b !== void 0 ? _b : config_1.default.redirects,
            headers: {
                "User-Agent": config_1.default.agent,
            },
            beforeRedirect: function (record, response) {
                return __awaiter(this, void 0, void 0, function* () {
                    if ((0, lodash_1.default)(response.headers).has("location")) {
                        stream.write([record.href]);
                    }
                });
            },
            validateStatus: function () {
                return true;
            },
        })
            .catch(function (error) {
            if (!error.message.includes("redirects")) {
                console.log();
                console.log("request error:", error.message);
            }
        });
        console.log();
        console.log(colors_1.default.yellow("WARNING:"), "dont enter any unkown links for your safe");
        console.log(colors_1.default.yellow("WARNING:"), 'be carefull with unsecured protocols like "http"');
    });
});
application.parse(process.argv);
