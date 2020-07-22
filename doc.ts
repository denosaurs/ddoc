// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import { DocsData } from "./third_party/data.ts";
import { DocNode } from "./third_party/docs.ts";

export async function getDocs(
  source: string,
  reload: boolean,
  deno: boolean,
): Promise<DocsData> {
  let cmd = ["deno", "doc", source, "--json"];
  if (deno) cmd = ["deno", "doc", "--json"];
  if (reload) cmd.push("--reload");
  const proc = Deno.run({
    cmd,
    stdout: "piped",
    stderr: "piped",
  });

  const decoder = new TextDecoder();

  const [out, err] = await Promise.all([
    proc.output(),
    proc.stderrOutput(),
  ]);

  const status = await proc.status();
  proc.close();

  if (!status.success) {
    console.error(decoder.decode(err));
    throw new Error(decoder.decode(err));
  }

  const json = decoder.decode(out);
  const data: DocsData = {
    nodes: JSON.parse(json) as DocNode[],
    timestamp: new Date().toISOString(),
  };

  return data;
}
