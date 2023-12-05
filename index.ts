import { getInput, info } from "@actions/core";
import OASNormalize from "oas-normalize";
import OAS from "oas";

export async function main() {
  const token = getInput("frevo_token", { required: true });
  const path = getInput("path", { required: true });
  const config = getInput("config", { required: false });

  const oas = new OASNormalize(path, { enablePaths: true });
  await oas.load();

  info("OAS Specification loaded. Version: " + (await oas.version()).version);

  return;
}

main();
