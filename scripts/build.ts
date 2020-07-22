// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import Terser from "https://jspm.dev/terser@4.8.0";

import { join, walk, relative, encode } from "./script_deps.ts";
import { run } from "./global.ts";

if (import.meta.main) {
  const cwd = Deno.cwd();
  const web = join(cwd, "doc_website");
  const out = join(web, "out");

  console.log("[*] building...");

  if (!Deno.args.includes("--skip")) {
    await run("yarn", web);
    await run("yarn build", web);
    await run("yarn export", web);
  }

  const data: {
    [key: string]: string;
  } = {};

  for await (const entry of walk(out)) {
    const path = relative(out, entry.path);
    if (path.trim().length == 0) continue;
    if (!entry.isFile) {
      data[path] = "d";
      continue;
    }
    const content = encode(Deno.readFileSync(entry.path).buffer);
    data[path] = content;
  }

  const source = `
  export const site = ${JSON.stringify(data)};`;

  const output = Terser.minify(`${source}`, {
    mangle: { module: true },
    output: {
      preamble: "//deno-fmt-ignore-file",
    },
  });

  if (output.error) {
    throw output.error;
  }

  await Deno.writeTextFile("website.js", output.code);

  console.log("[*] done!");
}
