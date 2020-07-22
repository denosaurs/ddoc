// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import { WebView } from "https://deno.land/x/webview@0.4.5/mod.ts";

import { log, delay } from "./deps.ts";
import { setupLog } from "./log.ts";
import { cli } from "./cli.ts";

export const VERSION = "0.0.2";

if (import.meta.main) {
  await setupLog();

  const [source, reload, lib] = cli();

  const host = "localhost";
  const port = 3000;
  const hostname = `http://${host}:${port}`;

  const query = new URLSearchParams();
  query.append("url", source);
  query.append("reload", String(reload));
  query.append("lib", String(lib));
  const url = new URL(`/?${query.toString()}`, hostname);

  log.info("spawning server webworker...");
  const worker = new Worker(
    new URL("server.ts", import.meta.url).href,
    { type: "module", deno: true },
  );
  worker.onmessage = (e) => {
    log.info("server worker closed");
  };

  await delay(850); // give some time for oak to start

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
