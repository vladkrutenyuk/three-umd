import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

const _module = "three";
const _namespace = "THREE";
const _jsInput = "node_modules/three/build/three.module.js";
const _dtsInput = "node_modules/@types/three/index.d.ts";

export default [
  // Сборка JavaScript
  {
    input: _jsInput, // входной файл three.js
    output: [
      {
        file: `dist/${_module}.umd.js`, // не минифицированный UMD файл
        format: "umd", // формат UMD
        name: _namespace, // глобальное имя
        globals: {
          three: _namespace,
        },
      },
      {
        file: `dist/${_module}.umd.min.js`, // минифицированный UMD файл
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
    input: _dtsInput,
    output: {
      file: `dist/${_module}.umd.d.ts`,
      format: "es",
      banner: `declare namespace ${_namespace} {`,
      footer: `}
        declare module "${_module}" { export=${_namespace};}
      `,
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
