// Copyright 2020 the Deno authors. All rights reserved. MIT license.

import { DocNode } from "./docs.ts";

export interface DocsData {
  timestamp: string;
  nodes: DocNode[];
}
