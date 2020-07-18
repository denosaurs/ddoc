import { DocsData } from "./third_party/data.ts";
import { DocNode } from "./third_party/docs.ts";

export async function getDocs(source: string): Promise<DocsData> {
  const proc = Deno.run({
    cmd: ["deno", "doc", source, "--json", "--reload"],
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
    throw new Error(decoder.decode(err));
  }

  const json = decoder.decode(out);
  const data: DocsData = {
    nodes: JSON.parse(json) as DocNode[],
    timestamp: new Date().toDateString(),
  };

  return data;
}
