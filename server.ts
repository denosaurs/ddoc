// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import {
  Application,
  Context,
  Router,
  helpers,
  parse,
  extname,
  decodeString,
} from "./deps.ts";
import { getDocs } from "./doc.ts";
import { setupLog } from "./log.ts";

import { site } from "./website.js";

await setupLog();

const app = new Application();

const controller = new AbortController();
const { signal } = controller;

const router = new Router();
router.get("/api/docs", async (ctx: Context) => {
  const query = helpers.getQuery(ctx, { mergeParams: true });
  const { url, reload, lib } = query;
  ctx.response.body = JSON.stringify(
    await getDocs(url, reload === "true", lib === "true"),
  );
});

router.get("/(.*)", async (ctx: Context) => {
  await send(ctx);
});

app.use(router.routes());
app.use(router.allowedMethods());

let promise = app.listen({ port: 3000, signal });

function decodeComponent(text: string): string {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

async function send(ctx: Context): Promise<string | undefined> {
  const index = "index.html";
  let path = ctx.request.url.pathname;

  const trailingSlash = path[path.length - 1] === "/";
  path = decodeComponent(path.substr(parse(path).root.length));
  if (index && trailingSlash) {
    path += index;
  }

  let file = site[path];
  if (file === "d") {
    path += `/${index}`;
    file = site[path];
  }

  file = decodeString(file);

  ctx.response.type = extname(path);
  ctx.response.body = file;
  return path;
}

self.onmessage = async (_) => {
  controller.abort();
  await promise;
  postMessage({});
  self.close();
};
