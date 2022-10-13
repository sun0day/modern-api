import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./index.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  treeshake: true,
  format: ['cjs', 'esm'],
  outExtension: (ctx) => {
    return {
      js: `.${ctx.format === 'cjs' ? 'cjs' : 'mjs'}`,
    }
  },
})
