import { getInput } from "@actions/core";

export async function main() {
  const token = getInput("frevo_token", { required: true });
  const path = getInput("path", { required: true });
  const config = getInput("config", { required: false });

  console.log({
    token,
    path,
    config,
  });

  return;
}
