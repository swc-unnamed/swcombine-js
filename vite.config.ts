import { defineConfig } from 'vite'

import typescript from '@rollup/plugin-typescript'
import { resolve } from 'path'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { nodeExternals } from 'rollup-plugin-node-externals'

export default defineConfig({
  base: './',
  plugins: [
    nodeExternals(),
    tsconfigPaths(),
    dts({
      include: ['src'],
      rollupTypes: true,
      logLevel: 'error',
    }),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
    extensions: ['.ts'],
  },
  build: {
    minify: false,
    reportCompressedSize: true,

    rollupOptions: {
      input: resolve(__dirname, 'src/index.ts'),
      preserveEntrySignatures: 'allow-extension',
      output: [
        {
          dir: './dist',
          entryFileNames: 'index.cjs.js',
          format: 'cjs',
          name: 'swcombine.js',
          plugins: [],
        },
        {
          dir: './dist',
          entryFileNames: 'index.esm.js',
          format: 'esm',
          name: 'swcombine.js',
          plugins: [nodePolyfills({ include: [] })],
        },
      ],
      external: [],
      plugins: [
        typescriptPaths({
          absolute: false,
        }),
        typescript({ tsconfig: './tsconfig.json' }),
      ],
    },
  },
})
