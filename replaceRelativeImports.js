import path from "path";

function replaceRelativeImports(namespace) {
  return {
    name: "replace-relative-imports",
    resolveId(source, importer) {
      if (importer && source.startsWith(".")) {
        const absolutePath = path.resolve(path.dirname(importer), source);
        const moduleName = path.basename(absolutePath, ".js");
        return {
          id: `${namespace}.${moduleName}`,
          external: true
        };
      }
      return null;
    },
    renderChunk(code, chunk) {
      return code.replace(/import\s+(.*?)\s+from\s+['"](.*?)['"]/g, (match, p1, p2) => {
        if (p2.startsWith(".")) {
          const moduleName = path.basename(p2, ".js");
          return `var ${p1} = ${namespace}.${moduleName};`;
        }
        return match;
      });
    }
  };
}

export default replaceRelativeImports;