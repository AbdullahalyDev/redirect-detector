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
const config_1 = __importDefault(require("./config"));
const url_helper_1 = __importDefault(require("./helpers/url.helper"));
const application = commander_1.default.program;
application.name("redirect link detector");
application.description("this project let you check if the url have redirect link");
application.version("0.0.1");
application.argument("url", "url to check it");
application.action(function (argument) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = url_helper_1.default.isUrl(argument);
        if (!url) {
            console.log("invalid url format, may you forgot the proctol");
            return;
        }
        const request = yield axios_1.default
            .get(argument, {
            method: "GET",
            maxRedirects: 0,
            headers: {
                "User-Agent": config_1.default.agent,
            },
            validateStatus: function () {
                return true;
            },
        })
            .catch(function (error) {
            console.log("request error:", error.message);
        });
        if (!request) {
            return;
        }
        if (!((0, lodash_1.default)(request.headers).has("location") &&
            (0, lodash_1.default)(request.status).inRange(300, 308))) {
            console.log("link not include any redirect headers");
        }
        console.log("redirect header detected");
        console.log(request.headers.location);
    });
});
application.parse(process.argv);
