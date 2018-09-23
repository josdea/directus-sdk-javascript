import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'index.js',
    output: {
      name: 'remoteInstance',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
    },
    plugins: [
      resolve(),
      commonjs(),
      globals(),
      builtins(),
      json(),
      terser(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'index.js',
    external: ['axios', 'qs'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
