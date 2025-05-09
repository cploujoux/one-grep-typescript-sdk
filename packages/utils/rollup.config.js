import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import { defineConfig } from 'rollup'

const config = defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        inlineDynamicImports: true,
        sourcemap: false
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        inlineDynamicImports: true,
        sourcemap: false
      }
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
        moduleDirectories: ['node_modules']
      }),
      commonjs({
        transformMixedEsModules: true,
        extensions: ['.js'],
        exclude: ['package.json', '**/package.json', '**/*.json']
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
        outDir: './dist'
      }),
      json({
        preferConst: true,
        compact: true,
        namedExports: true,
        include: ['package.json', '**/package.json', '**/*.json']
      })
    ],
    external: [
      'chalk',
      'pino',
      'pino-pretty',
      'thread-stream' // https://github.com/pinojs/pino/blob/main/docs/bundling.md
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()]
  }
])

export default config
