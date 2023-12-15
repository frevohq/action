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
const pako_1 = __importDefault(require("pako"));
const undici_1 = require("undici");
const getSizeInMB = (data) => {
    const sizeInBytes = Buffer.byteLength(JSON.stringify(data), 'utf8');
    return (sizeInBytes / (1024 * 1024)).toFixed(2);
};
const debug = (message) => (0, core_1.debug)(`[frevo] ${message}`);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let token = (0, core_1.getInput)('frevo_token', { required: true });
        let path = (0, core_1.getInput)('path', { required: true });
        let config = (0, core_1.getInput)('config', { required: false });
        debug(`path: ${path}`);
        const spec = yield swagger_parser_1.default.bundle(path, {});
        debug(`total spec size ${getSizeInMB(spec)} MB`);
        debug(`compressing`);
        const str = JSON.stringify(spec);
        const uint8 = new TextEncoder().encode(str);
        const body = pako_1.default.gzip(uint8);
        debug(`compressing done`);
        debug(`uploading`);
        const response = yield (0, undici_1.fetch)('https://api.frevo.dev/openapi', {
            method: 'POST',
            body,
            headers: {
                'Content-Encoding': 'gzip',
                'Content-Type': 'application/json',
                'Content-Length': body.length.toString(),
                Authorization: `Bearer ${token}`,
            },
        });
        debug(`uploading done, ok=${response.ok} status=${response.statusText}`);
        if (!response.ok) {
            (0, core_1.error)(`Error uploading spec: ${response.statusText}`);
        }
        return;
    });
}
exports.main = main;
main();
