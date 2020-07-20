// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import { files, run } from "./global.ts";

if (import.meta.main) {
  console.log("[*] formatting...");

  let cmd = [
    "deno",
    "fmt",
    "--check",
    ...files,
  ];

  await run(cmd);

  console.log("[*] linting...");

  cmd = [
    "deno",
    "lint",
    "--unstable",
    ...files,
  ];

  await run(cmd);

  console.log("[*] done!");
}
