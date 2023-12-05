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
const swagger_parser_1 = __importDefault(require("@apidevtools/swagger-parser"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // const token = getInput("frevo_token", { required: true });
        // const path = getInput("path", { required: true });
        // const config = getInput("config", { required: false });
        const path = "./fixture/2-petstore-ref/openapi.yaml";
        const spec = yield swagger_parser_1.default.dereference(path);
        (0, core_1.info)("OAS Specification loaded: " + spec.info.title + " " + spec.info.version);
        return;
    });
}
exports.main = main;
main();
