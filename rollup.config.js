import resolve from '@rollup/plugin-node-resolve';
import buble from '@rollup/plugin-buble';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'main.js',
  output: {
    file: 'dist/imi-enrichment-jsic.js',
    format: 'umd',
    name: 'IMIEnrichmentJSIC'
  },
  plugins: [
    resolve(),
    json(),
    commonjs(),
    buble()
  ]
};
