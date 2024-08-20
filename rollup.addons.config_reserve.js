import fs from "fs";
import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

const baseDir = "node_modules/three/examples/jsm";
const outputDir = "dist/addons";
const namespace = 'ThreeAddons'

// Укажите нужные папки или файлы относительно baseDir
const entries = [
  "controls",
  "loaders/DRACOLoader.js",
  "loaders/GLTFLoader.js",
  "loaders/FBXLoader.js",
  "loaders/OBJLoader.js",
  "loaders/RGBELoader.js",
  "loaders/EXRLoader.js",
  "utils/SkeletonUtils.js",
  "utils/BufferGeometryUtils.js",
  "postprocessing",
  "libs/stats.module.js",
];

// Функция для получения всех файлов в директории
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file)); // Рекурсивно получаем файлы из подпапок
    } else if (file.endsWith(".js")) {
      results.push(file);
    }
  });

  return results;
}

// Генерируем конфигурации для каждого файла в entries
const configs = entries.flatMap((entry) => {
  const fullPath = path.join(baseDir, entry);

  if (fs.statSync(fullPath).isDirectory()) {
    const files = getFiles(fullPath); // Если это папка, получаем все файлы
    return files.map((file) => {
      const relativePath = path.relative(baseDir, file);
      const outputPath = path.join(outputDir, relativePath);

      return {
        input: file,
        output: {
          file: outputPath.replace(/\.js$/, ".umd.js"),
          format: "umd",
          name: `${namespace}.${path.basename(relativePath, ".js")}`, // Привязываем модуль к ThreeAddon
          globals: {
            three: "THREE",
          },
          banner: `
            (function(global) {
              if (typeof global.${namespace} === 'undefined') {
                global.${namespace} = {};
              }
            })(typeof self !== 'undefined' ? self : this);
          `,
        },
        external: ["three"],
        plugins: [
          resolve(),
          commonjs(),
          babel({
            exclude: "node_modules/**",
            babelHelpers: "bundled",
          }),
          json(),
          terser(),
        ],
      };
    });
  } else {
    const outputPath = path.join(outputDir, entry);
    return {
      input: fullPath,
      output: {
        file: outputPath.replace(/\.js$/, ".umd.js"),
        format: "umd",
        name: `${namespace}.${path.basename(entry, ".js")}`, // Привязываем модуль к ThreeAddon
        globals: {
          three: "THREE",
        },
        banner: `
          (function(global) {
            if (typeof global.${namespace} === 'undefined') {
              global.${namespace} = {};
            }
          })(typeof self !== 'undefined' ? self : this);
        `,
      },
      external: ["three"],
      plugins: [
        resolve(),
        commonjs(),
        babel({
          exclude: "node_modules/**",
          babelHelpers: "bundled",
        }),
        json(),
        terser(),
      ],
    };
  }
});

export default configs;
