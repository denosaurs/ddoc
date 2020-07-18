import { WebView } from "https://deno.land/x/webview/mod.ts";

import { log, delay } from "./deps.ts";
import { setupLog } from "./log.ts";

if (import.meta.main) {
  await setupLog();

  const args = Deno.args;
  if (args.length != 1) {
    log.critical("You need to provide a source. (eg: denodoc <source>)");
    Deno.exit(1);
  }

  const source = args[0];

  const host = "localhost";
  const port = 3000;
  const hostname = `http://${host}:${port}`;

  const query = new URLSearchParams();
  query.append("url", source);
  const url = new URL(`/?${query.toString()}`, hostname);

  log.info("spawning server webworker...");
  const worker = new Worker(
    new URL("server.ts", import.meta.url).href,
    { type: "module", deno: true },
  );
  worker.onmessage = (e) => {
    log.info("server worker closed");
  };

  await delay(750); // give some time for oak to start

  log.info("webview is starting...");

  await new WebView({
    title: `Documentation for "${source}"`,
    url: url.toString(),
    height: 600,
    resizable: true,
  }).run();

  log.info("webview closed closed");
  log.info("closing server worker...");
  worker.postMessage({});
}
