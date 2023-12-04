import { getInput, info,debug } from "@actions/core";

export async function main() {
  const token = getInput("frevo_token", { required: true });
  const path = getInput("path", { required: true });
  const config = getInput("config", { required: false });

  debug(
    JSON.stringify({
      token,
      path,
      config,
    })
  );

  return;
}
