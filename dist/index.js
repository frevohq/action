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
exports.main = void 0;
const core_1 = require("@actions/core");
const oas_normalize_1 = __importDefault(require("oas-normalize"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = (0, core_1.getInput)("frevo_token", { required: true });
        const path = (0, core_1.getInput)("path", { required: true });
        const config = (0, core_1.getInput)("config", { required: false });
        const oas = new oas_normalize_1.default(path, { enablePaths: true });
        yield oas.load();
        (0, core_1.info)("OAS Specification loaded. Version: " + (yield oas.version()).version);
        return;
    });
}
exports.main = main;
main();
