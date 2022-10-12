/**
 * 读取'playwright-core/types/protocol.d.ts' 生成需要的protocol api
 */

import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const protocolPath = require.resolve('playwright-core/types/protocol');
const outPath = path.join(__dirname, '../src/recorder/common/protocol-api.ts');

const ParamterMap: {
  [key: string]: string;
} = {};

const ReturnMap: {
  [key: string]: string;
} = {};

function visit(node: ts.Node) {
  if (
    node.parent &&
    ts.isInterfaceDeclaration(node.parent) &&
    ts.isPropertySignature(node) &&
    node.parent.name.text === 'CommandParameters'
  ) {
    if (ts.isTypeReferenceNode(node.type!)) {
      ParamterMap[node.name.getText().slice(1, -1)] = node.type
        .getFullText()
        .trim();
    }
  }

  if (
    node.parent &&
    ts.isInterfaceDeclaration(node.parent) &&
    ts.isPropertySignature(node) &&
    node.parent.name.text === 'CommandReturnValues'
  ) {
    if (ts.isTypeReferenceNode(node.type!)) {
      ReturnMap[node.name.getText().slice(1, -1)] = node.type
        .getFullText()
        .trim();
    }
  }
  node.forEachChild(visit);
}

function instrument(fileName: string, sourceCode: string) {
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceCode,
    ts.ScriptTarget.Latest,
    true,
  );
  visit(sourceFile);
}

function createOutFileContent() {
  const domains: {
    [key: string]: {
      [key: string]: [string, string];
    };
  } = {};
  const cmds: string[] = [];
  Object.keys(ParamterMap).forEach(key => {
    cmds.push(key);
    const [domain, method] = key.split('.');
    if (!domains[domain]) {
      domains[domain] = {};
    }
    domains[domain][method] = [ParamterMap[key], ''];
  });
  Object.keys(ReturnMap).forEach(key => {
    const [domain, method] = key.split('.');
    if (!domains[domain]) {
      return;
    }
    domains[domain][method][1] = ReturnMap[key];
  });

  const out = [
    '/* eslint-disable prettier/prettier */\n',
    `import { Protocol } from 'playwright-core/types/protocol';\n`,
    `import { genInjectID, IServiceManager } from '@/core';\n`,
  ];

  const domainNames = Object.keys(domains);
  domainNames.forEach(domain => {
    out.push(`\nexport interface I${domain} {\n`);
    Object.keys(domains[domain]).forEach(method => {
      const [arg, ret] = domains[domain][method];
      out.push(
        `  ${method}(arg: Protocol.${arg}): Promise<Protocol.${ret}>;\n`,
      );
    });
    out.push(`}\n`);
    out.push(`\nexport const I${domain} = genInjectID<I${domain}>()\n`);
  });

  out.push(`
export const IServices = {
${domainNames.map(domainName => `  I${domainName},`).join('\n')}
};
`);

  out.push(`
export function registerCmds(backend: {registerCommand: (cmd: any) => void}) {
${cmds.map(cmd => `  backend.registerCommand('${cmd}');`).join('\n')}
}
`);

  out.push(`
export function registerServices(serviceManager: IServiceManager, backend: {getDomain: (domainName: string) => any}) {
${domainNames
  .map(
    domainName =>
      `  serviceManager.registerServiceBean(I${domainName}, backend.getDomain('${domainName}'));`,
  )
  .join('\n')}
}
`);

  fs.writeFileSync(outPath, out.join(''));
}
instrument('protocol.d.ts', fs.readFileSync(protocolPath, 'utf-8'));
createOutFileContent();
