// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import { files, run } from "./global.ts";

if (import.meta.main) {
  console.log("[*] formatting...");

  const cmd = [
    "deno",
    "fmt",
    ...files,
  ];

  await run(cmd);

  console.log("[*] done!");
}
