/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */

/** A qualified name, e.g. method */
export type UnqualifiedName = string & {
  unqualifiedEventNameTag: string | undefined;
};
export type QualifiedName = string & {
  qualifiedEventNameTag: string | undefined;
};

export const splitQualifiedName = (
  string: QualifiedName,
): [string, UnqualifiedName] => {
  const [domain, eventName] = string.split('.');
  return [domain, eventName as UnqualifiedName];
};

export const qualifyName = (
  domain: string,
  name: UnqualifiedName,
): QualifiedName => {
  return `${domain}.${name}` as QualifiedName;
};

export default class AgentPrototype {
  readonly domain: string;

  constructor(domain: string) {
    this.domain = domain;
  }

  registerCommand(methodName: UnqualifiedName): void {
    const domainAndMethod = qualifyName(this.domain, methodName);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Method code generation
    this[methodName] = (request: any) => {
      return this.invoke(domainAndMethod, request);
    };
  }

  // eslint-disable-next-line class-methods-use-this
  invoke(cmd: QualifiedName, request: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Method code generation
    return window.__invoke_cmd(cmd, request);
  }
}
