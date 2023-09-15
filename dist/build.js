"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
// build windows
shelljs_1.default.exec("npx pkg ./dist/index.js --target node16-win-x64 --public --output ./build/win/redirect");
// build linux
shelljs_1.default.exec("npx pkg ./dist/index.js --target node16-linux-x64 --public --output ./build/linux/redirect");
// build macos
shelljs_1.default.exec("npx pkg ./dist/index.js --target node16-macos-x64 --public --output ./build/macos/redirect");
