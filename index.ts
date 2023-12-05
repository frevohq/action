import { getInput, info } from "@actions/core";
import parser from "@apidevtools/swagger-parser";

export async function main() {
  // const token = getInput("frevo_token", { required: true });
  // const path = getInput("path", { required: true });
  // const config = getInput("config", { required: false });

  const path = "./fixture/2-petstore-ref/openapi.yaml";
  const spec = await parser.dereference(path);

  info("OAS Specification loaded: " + spec.info.title + " " + spec.info.version);

  return;
}

main();
