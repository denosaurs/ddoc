// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import { join } from "https://deno.land/std@0.61.0/path/mod.ts";
import { run } from "./global.ts";

if (import.meta.main) {
  const cwd = join(Deno.cwd(), "doc_website");

  console.log("[*] building...");

  await run("yarn", cwd);
  await run("yarn build", cwd);
  await run("yarn export", cwd);

  console.log("[*] done!");
}
