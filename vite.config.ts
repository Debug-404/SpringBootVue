import {fileURLToPath, URL} from "node:url"

import {defineConfig} from "vite"
import vue from "@vitejs/plugin-vue"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import {ElementPlusResolver} from "unplugin-vue-components/resolvers"
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        WindiCSS(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    server: {
        // port: 8089,
        cors: true, //前端跨域
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "")
            }
        },
        open: true //项目启动时打开浏览器
    },
    base: "./",
    build: {
        chunkSizeWarningLimit: 2000,
        cssCodeSplit: true, //css 拆分
        sourcemap: false, //不生成sourcemap
        assetsInlineLimit: 5000 //小于该值 图片将打包成Base64
    }
})
