import path from "path";
import fs, { readFileSync } from "fs";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import sizes from "@atomico/rollup-plugin-sizes";
import autoExternal from "rollup-plugin-auto-external";

async function getBuildPackages(packagesDir) {
  return new Promise((resolve, reject) => {
    fs.readdir(packagesDir, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        reject(err);
        return;
      }

      const subdirs = files
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => {
          return {
            path: `${packagesDir}/${dirent.name}`,
            name: dirent.name,
          };
        });

      resolve(subdirs);
    });
  });
}

async function build(commandLineArgs) {
  const config = [];
  const packages = [];
  const common = (await getBuildPackages("./app")).filter(
    (pkg) => pkg.name === "common" || pkg.name === "proto",
  );
  packages.push(...common);

  packages.forEach((pkg) => {
    const basePath = pkg.path;
    const input = path.join(basePath, "src/index.ts");
    const pg = readFileSync(path.join(basePath, "package.json"), "utf-8");
    const { name, exports } = JSON.parse(pg);

    if (!exports) {
      return;
    }

    const basePlugins = [
      sourcemaps(),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      sizes(),
      json(),
      // importAssertions(),
    ];

    config.push({
      // perf: true,
      input,
      output: [
        {
          name,
          file: path.join(basePath, exports.default.require),
          format: "cjs",
          sourcemap: true,
          exports: "auto",
        },
        {
          name,
          file: path.join(basePath, exports.default.import),
          format: "es",
          sourcemap: true,
        },
      ],
      plugins: [
        autoExternal({
          packagePath: path.join(basePath, "package.json"),
        }),
        ...basePlugins,
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              declaration: true,
              types: ["node"],
              paths: {
                "@hocuspocus/*": ["packages/*/src"],
              },
            },
            include: [],
            exclude: ["tests", "playground", "test"],
          },
        }),
      ],
    });
  });

  return config;
}

export default build;
