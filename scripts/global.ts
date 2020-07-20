// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

export const files = [
  "scripts/build.ts",
  "scripts/check.ts",
  "scripts/fmt.ts",
  "scripts/global.ts",
  "ddoc.ts",
  "deps.ts",
  "doc.ts",
  "log.ts",
  "server.ts",
];

export async function run(
  cmd: string | string[],
  cwd = Deno.cwd(),
): Promise<Deno.ProcessStatus> {
  if (typeof cmd === "string") cmd = cmd.split(" ");
  return await Deno.run({
    cmd: cmd,
    cwd,
  }).status();
}
