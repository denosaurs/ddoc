import { join } from "https://deno.land/std@0.61.0/path/mod.ts";

async function run(cwd: string, cmd: string) {
  await Deno.run({
    cmd: cmd.split(" "),
    cwd,
  }).status();
}

if (import.meta.main) {
  const cwd = join(Deno.cwd(), "doc_website");

  console.log("[*] building...");

  await run(cwd, "yarn");
  await run(cwd, "yarn build");
  await run(cwd, "yarn export");

  console.log("[*] done!");
}
