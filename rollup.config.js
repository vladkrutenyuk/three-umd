import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

const _namespace = 'THREE';

export default [
  // Сборка JavaScript
  {
    input: "node_modules/three/build/three.module.js", // входной файл three.js
    output: [
      {
        file: "dist/three-umd.js", // не минифицированный UMD файл
        format: "umd", // формат UMD
        name: "THREE", // глобальное имя
        globals: {
          three: _namespace,
        },
      },
      {
        file: "dist/three-umd.min.js", // минифицированный UMD файл
        format: "umd",
        name: _namespace,
        plugins: [terser()],
        globals: {
          three: _namespace,
        },
      },
    ],
    plugins: [resolve()],
  },
  {
    // input: "types/index.d.ts",
    input: "node_modules/@types/three/index.d.ts",
    output: {
      file: "dist/three-umd.d.ts",
      format: "es",
      banner: `declare namespace ${_namespace} {`,
      footer: `}`,
    },
    plugins: [
      resolve({
        extensions: [".d.ts", ".ts", ".js"], // Разрешаем необходимые расширения
        preferBuiltins: false,
        mainFields: ["types", "typings", "module", "main"],
      }),
      dts({
        respectExternal: true,
      }),
    ],
  },
];
