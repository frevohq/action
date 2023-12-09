import { getInput, info, debug as actionDebug } from "@actions/core";
import parser from "@apidevtools/swagger-parser";
import pako from "pako";
import { fetch } from "undici";

const getSizeInMB = (data: Record<string, any>) => {
  const sizeInBytes = Buffer.byteLength(JSON.stringify(data), "utf8");
  return (sizeInBytes / (1024 * 1024)).toFixed(2);
};

const debug = (message: string) => actionDebug(`[frevo] ${message}`);

export async function main() {
  let token = getInput("frevo_token", { required: true });
  let path = getInput("path", { required: true });
  let config = getInput("config", { required: false });

  // Uncomment for local testing
  // let token = "";
  // let path = "./fixture/2-petstore-ref/openapi.yaml";
  // let path = "./fixture/3-stripe/openapi.json";

  debug(`path: ${path}`);
  const spec = await parser.bundle(path, {});
  debug(`total spec size ${getSizeInMB(spec)} MB`);

  debug(`compressing`);
  const str = JSON.stringify(spec);
  const uint8 = new TextEncoder().encode(str);
  const body = pako.gzip(uint8) as any;
  debug(`compressing done`);

  debug(`uploading`);
  const response = await fetch("https://frevo-api-69.localcan.dev/openapi", {
    method: "POST",
    body,
    headers: {
      "Content-Encoding": "gzip",
      "Content-Type": "application/json",
      "Content-Length": body.length.toString(),
      Authorization: `Bearer ${token}`,
    },
  });
  debug(`uploading done, ok=${response.ok} status=${response.statusText}`);

  return;
}

main();
