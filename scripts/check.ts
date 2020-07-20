// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import { assert } from "./script_deps.ts";
import { files, run } from "./global.ts";

if (import.meta.main) {
  console.log("[*] formatting...");

  let cmd = [
    "deno",
    "fmt",
    "--check",
    ...files,
  ];

  let status = await run(cmd);
  assert(status.success);

  console.log("[*] linting...");

  cmd = [
    "deno",
    "lint",
    "--unstable",
    ...files,
  ];

  status = await run(cmd);
  assert(status.success);

  console.log("[*] done!");
}
