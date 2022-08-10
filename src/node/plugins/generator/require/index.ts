import * as ts from "typescript";
import fs from "fs";

export default function Require(tsPath: string) {
  const result = ts.transpileModule(fs.readFileSync(tsPath).toString("utf-8"), {
    compilerOptions: {
      allowJs: true,
      noEmitOnError: true,
      noImplicitAny: true,
      experimentalDecorators: true,
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.CommonJS,
    },
    transformers: {
      before: [
        (): ts.Transformer<ts.SourceFile> => {
          return (source: ts.SourceFile) => {
            ts.forEachChild(source, (node) => {
              if (ts.isImportDeclaration(node)) {
                // todo ast change
              }
            });
            return source;
          };
        },
      ],
    },
  });
  return result.outputText;
}
