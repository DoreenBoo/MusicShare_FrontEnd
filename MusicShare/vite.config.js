import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // 代理所有请求到 /share-aoo-api 开头的路径
      '/share-app-api': {
        target: 'http://localhost:8083', // 目标后端 API 地址
        changeOrigin: true,  // 修改请求头中的 Origin 字段，使其符合目标地址
        rewrite: (path) => path.replace(/^\/share-app-api/, ''), // 重写路径，使之符合目标路径
      },
    },
  },
})
