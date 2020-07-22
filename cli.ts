import { VERSION } from "./ddoc.ts";
import { log } from "./deps.ts";

export function cli(): [string, boolean, boolean] {
  let args = [...Deno.args];

  if (args.includes("-h") || args.includes("--help")) {
    console.log(`
DDOC v${VERSION}
the denosaurs team

usage: ddoc [options] [source]

[options]:
  -h --help     Show this message.
  -r --reload   Reload the source.

[source]:
  a .ts/.js file, can be url or path.
  if not source is provided \`Deno\` 
  docs will be shown.`);
    Deno.exit(0);
  }

  let reload = false;
  if (args.includes("-r") || args.includes("--reload")) {
    let index = args.indexOf("-r");
    index = index < 0 ? args.indexOf("--reload") : index;
    args.splice(index, 1);
    reload = true;
  }

  const raw = args.filter(item => !item.startsWith("-"));
  const diff = args.filter(item => !raw.includes(item));

  if (diff.length !== 0) {
    log.critical(`options \`${Deno.inspect(diff)}\` not recognized.`);
    Deno.exit(1);
  }

  if (raw.length > 1) {
    log.critical(`please provide zero or one source only.`);
    Deno.exit(1);
  }

  const lib = raw.length === 0;
  const source = raw[0] ?? "lib.deno.d.ts";

  return [source, reload, lib];
}