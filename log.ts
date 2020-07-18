// Copyright 2020-present the denosaurs team. All rights reserved. MIT license.

import {
  log,
  reset,
  bold,
  green,
  blue,
  yellow,
  gray,
  red,
  LogRecord,
  LogLevels,
  BaseHandler,
} from "./deps.ts";

const DEFAULT_HANDLER = "format_fn";

export class ConsoleHandler extends BaseHandler {
  format(record: LogRecord): string {
    let msg = "";

    const date = new Date();
    const datestr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    msg += gray(`[${datestr}] `);
    switch (record.level) {
      case LogLevels.DEBUG:
        msg += green("[&]");
        break;
      case LogLevels.INFO:
        msg += blue("[*]");
        break;
      case LogLevels.WARNING:
        msg += yellow("[!]");
        break;
      case LogLevels.ERROR:
        msg += red("[^]");
        break;
      case LogLevels.CRITICAL:
        msg += bold(red("[@]"));
        break;
      default:
        break;
    }

    msg += ` ${reset(record.msg)}`;
    return msg;
  }

  log(msg: string): void {
    console.log(msg);
  }
}

export async function setupLog(): Promise<void> {
  const level = "DEBUG";
  await log.setup({
    handlers: {
      [DEFAULT_HANDLER]: new ConsoleHandler(level),
    },
    loggers: {
      default: {
        level,
        handlers: [DEFAULT_HANDLER],
      },
    },
  });
}