import { resolve } from 'node:path'
import * as path from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
//import { viteStaticCopy } from 'vite-plugin-static-copy'

//console.log('Resolved icon path:',path.resolve('resources'));

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    publicDir: path.resolve('resources'),
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './src/renderer/tailwind.config.js',
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [
      react(),
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: resolve(__dirname, 'resources', 'icon.png'), // Caminho do ícone
      //       dest: 'out', // Diretório de destino na pasta de build
      //     },
      //   ],
      // }),
    ],
  },
})
