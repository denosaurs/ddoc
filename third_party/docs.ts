// Copyright 2020 the Deno authors. All rights reserved. MIT license.

export enum DocNodeKind {
  Function = "function",
  Variable = "variable",
  Class = "class",
  Enum = "enum",
  Interface = "interface",
  TypeAlias = "typeAlias",
  Namespace = "namespace",
}
export interface DocNodeLocation {
  filename: string;
  line: number;
  col: number;
}
export interface DocNodeShared {
  name: string;
  scope?: string[];
  location: DocNodeLocation;
  jsDoc?: string;
}
export interface TsTypeParamDef {
  name: string;
  constraint?: TsTypeDef;
  default?: TsTypeDef;
}
export interface TsTypeRefDef {
  typeName: string;
  typeParams?: TsTypeDef[];
}
export interface TsTypeOperatorDef {
  operator: string;
  tsType: TsTypeDef;
}
export interface TsFnOrConstructorDef {
  constructor: boolean;
  tsType: TsTypeDef;
  params: ParamDef[];
}
export interface TsConditionalDef {
  checkType: TsTypeDef;
  extendsType: TsTypeDef;
  trueType: TsTypeDef;
  falseType: TsTypeDef;
}
export interface TsIndexedAccessDef {
  readonly: boolean;
  objType: TsTypeDef;
  indexType: TsTypeDef;
}
export interface TsTypeLiteralDef {
  methods: LiteralMethodDef[];
  properties: LiteralPropertyDef[];
  callSignatures: LiteralCallSignatureDef[];
  indexSignatures: LiteralIndexSignatureDef[];
}
export interface LiteralMethodDef {
  name: string;
  params: ParamDef[];
  returnType?: TsTypeDef;
}
export interface LiteralPropertyDef {
  name: string;
  computed: boolean;
  optional: boolean;
  tsType?: TsTypeDef;
}
export interface LiteralCallSignatureDef {
  params: ParamDef[];
  tsType?: TsTypeDef;
}
export interface LiteralIndexSignatureDef {
  readonly: boolean;
  params: ParamDef[];
  tsType?: TsTypeDef;
}
export interface LiteralMethodDef {
  params: ParamDef[];
  returnType?: TsTypeDef;
}
export enum LiteralDefKind {
  Number = "number",
  String = "string",
  Boolean = "boolean",
}
export type LiteralDef =
  | {
      kind: LiteralDefKind.Number;
      number: number;
    }
  | {
      kind: LiteralDefKind.String;
      string: string;
    }
  | {
      kind: LiteralDefKind.Boolean;
      boolean: boolean;
    };
export enum TsTypeDefKind {
  Keyword = "keyword",
  Literal = "literal",
  TypeRef = "typeRef",
  Union = "union",
  Intersection = "intersection",
  Array = "array",
  Tuple = "tuple",
  TypeOperator = "typeOperator",
  Parenthesized = "parenthesized",
  Rest = "rest",
  Optional = "optional",
  TypeQuery = "typeQuery",
  This = "this",
  FnOrConstructor = "fnOrConstructor",
  Conditional = "conditional",
  IndexedAccess = "indexedAccess",
  TypeLiteral = "typeLiteral",
}
export interface TsTypeDefShared {
  repr: string;
}
export interface TsTypeDefArray extends TsTypeDefShared {
  kind: TsTypeDefKind.Array;
  array: TsTypeDef;
}
export interface TsTypeDefConditional extends TsTypeDefShared {
  kind: TsTypeDefKind.Conditional;
  conditionalType: TsConditionalDef;
}
export interface TsTypeDefFnOrConstructor extends TsTypeDefShared {
  kind: TsTypeDefKind.FnOrConstructor;
  fnOrConstructor: TsFnOrConstructorDef;
}
export interface TsTypeDefIndexedAccess extends TsTypeDefShared {
  kind: TsTypeDefKind.IndexedAccess;
  indexedAccess: TsIndexedAccessDef;
}
export interface TsTypeDefIntersection extends TsTypeDefShared {
  kind: TsTypeDefKind.Intersection;
  intersection: TsTypeDef[];
}
export interface TsTypeDefKeyword extends TsTypeDefShared {
  kind: TsTypeDefKind.Keyword;
  keyword: string;
}
export interface TsTypeDefLiteral extends TsTypeDefShared {
  kind: TsTypeDefKind.Literal;
  literal: LiteralDef;
}
export interface TsTypeDefOptional extends TsTypeDefShared {
  kind: TsTypeDefKind.Optional;
  optional: TsTypeDef;
}
export interface TsTypeDefParenthesized extends TsTypeDefShared {
  kind: TsTypeDefKind.Parenthesized;
  parenthesized: TsTypeDef;
}
export interface TsTypeDefRest extends TsTypeDefShared {
  kind: TsTypeDefKind.Rest;
  rest: TsTypeDef;
}
export interface TsTypeDefThis extends TsTypeDefShared {
  kind: TsTypeDefKind.This;
  this: boolean;
}
export interface TsTypeDefTuple extends TsTypeDefShared {
  kind: TsTypeDefKind.Tuple;
  tuple: TsTypeDef[];
}
export interface TsTypeDefTypeLiteral extends TsTypeDefShared {
  kind: TsTypeDefKind.TypeLiteral;
  typeLiteral: TsTypeLiteralDef;
}
export interface TsTypeDefTypeOperator extends TsTypeDefShared {
  kind: TsTypeDefKind.TypeOperator;
  typeOperator: TsTypeOperatorDef;
}
export interface TsTypeDefTypeQuery extends TsTypeDefShared {
  kind: TsTypeDefKind.TypeQuery;
  typeQuery: string;
}
export interface TsTypeDefTypeRef extends TsTypeDefShared {
  kind: TsTypeDefKind.TypeRef;
  typeRef: TsTypeRefDef;
}
export interface TsTypeDefUnion extends TsTypeDefShared {
  kind: TsTypeDefKind.Union;
  union: TsTypeDef[];
}
export type TsTypeDef =
  | TsTypeDefArray
  | TsTypeDefConditional
  | TsTypeDefFnOrConstructor
  | TsTypeDefIndexedAccess
  | TsTypeDefIntersection
  | TsTypeDefKeyword
  | TsTypeDefLiteral
  | TsTypeDefOptional
  | TsTypeDefParenthesized
  | TsTypeDefRest
  | TsTypeDefThis
  | TsTypeDefTuple
  | TsTypeDefTypeLiteral
  | TsTypeDefTypeOperator
  | TsTypeDefTypeQuery
  | TsTypeDefTypeRef
  | TsTypeDefUnion;

export type ParamDef =
  | {
      kind: "array";
      elements: (ParamDef | null)[];
      optional: boolean;
      tsType?: TsTypeDef;
    }
  | {
      kind: "assign";
      left: ParamDef;
      right: string;
      tsType?: TsTypeDef;
    }
  | {
      kind: "identifier";
      name: string;
      optional: boolean;
      tsType?: TsTypeDef;
    }
  | {
      kind: "object";
      props: ObjectPatPropDef[];
      optional: boolean;
      tsType?: TsTypeDef;
    }
  | {
      kind: "rest";
      arg: ParamDef;
      tsType?: TsTypeDef;
    };
export type ObjectPatPropDef =
  | {
      kind: "assign";
      key: string;
      value?: string;
    }
  | {
      kind: "keyValue";
      key: string;
      value: ParamDef;
    }
  | {
      kind: "rest";
      arg: ParamDef;
    };
export interface FunctionDef {
  params: ParamDef[];
  returnType?: TsTypeDef;
  isAsync: boolean;
  isGenerator: boolean;
}
export interface VariableDef {
  tsType: TsTypeDef;
  kind: "var" | "let" | "const";
}
export type Accessibility = "public" | "protected" | "private";
export interface ClassConstructorDef extends DocNodeShared {
  accessibility?: Accessibility;
  params: ParamDef[];
}
export interface ClassPropertyDef extends DocNodeShared {
  tsType: TsTypeDef;
  readonly: boolean;
  accessibility?: Accessibility;
  optional: boolean;
  isAbstract: boolean;
  isStatic: boolean;
}
export interface ClassMethodDef extends DocNodeShared {
  accessibility?: Accessibility;
  optional: boolean;
  isAbstract: boolean;
  isStatic: boolean;
  kind: "method" | "getter" | "setter";
  functionDef: FunctionDef;
}
export interface ClassDef {
  isAbstract: boolean;
  constructors: ClassConstructorDef[];
  properties: ClassPropertyDef[];
  indexSignatures: ClassIndexSignatureDef[];
  methods: ClassMethodDef[];
  extends?: string;
  implements: TsTypeDef[];
  typeParams: TsTypeParamDef[];
  superTypeParams: TsTypeDef[];
}
export interface ClassIndexSignatureDef {
  readonly: boolean;
  params: ParamDef[];
  tsType?: TsTypeDef;
}
export interface EnumMemberDef {
  name: string;
}
export interface EnumDef {
  members: EnumMemberDef[];
}

export interface InterfaceMethodDef extends DocNodeShared {
  params: ParamDef[];
  optional: boolean;
  returnType?: TsTypeDef;
}

export interface InterfacePropertyDef extends DocNodeShared {
  computed: boolean;
  optional: boolean;
  tsType?: TsTypeDef;
}

export interface InterfaceCallSignatureDef extends Omit<DocNodeShared, "name"> {
  params: ParamDef[];
  tsType?: TsTypeDef;
}

export interface InterfaceDef {
  extends: TsTypeDef[];
  methods: InterfaceMethodDef[];
  properties: InterfacePropertyDef[];
  callSignatures: InterfaceCallSignatureDef[];
  indexSignatures: InterfaceIndexSignatureDef[];
  typeParams: TsTypeParamDef[];
}
export interface InterfaceIndexSignatureDef {
  readonly: boolean;
  params: ParamDef[];
  tsType?: TsTypeDef;
}
export interface TypeAliasDef {
  tsType: TsTypeDef;
}
export interface NamespaceDef {
  elements: DocNode[];
}

export type DocNodeFunction = DocNodeShared & {
  kind: DocNodeKind.Function;
  functionDef: FunctionDef;
};
export type DocNodeVariable = DocNodeShared & {
  kind: DocNodeKind.Variable;
  variableDef: VariableDef;
};
export type DocNodeClass = DocNodeShared & {
  kind: DocNodeKind.Class;
  classDef: ClassDef;
};
export type DocNodeEnum = DocNodeShared & {
  kind: DocNodeKind.Enum;
  enumDef: EnumDef;
};
export type DocNodeInterface = DocNodeShared & {
  kind: DocNodeKind.Interface;
  interfaceDef: InterfaceDef;
};
export type DocNodeTypeAlias = DocNodeShared & {
  kind: DocNodeKind.TypeAlias;
  typeAliasDef: TypeAliasDef;
};
export type DocNodeNamespace = DocNodeShared & {
  kind: DocNodeKind.Namespace;
  namespaceDef: NamespaceDef;
};

export type DocNode =
  | DocNodeFunction
  | DocNodeVariable
  | DocNodeClass
  | DocNodeEnum
  | DocNodeInterface
  | DocNodeTypeAlias
  | DocNodeNamespace;