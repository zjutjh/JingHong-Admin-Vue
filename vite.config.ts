import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@/apis": path.resolve(__dirname, "src/apis"),
        "@/assets": path.resolve(__dirname, "src/assets"),
        "@/components": path.resolve(__dirname, "src/components"),
        "@/constants": path.resolve(__dirname, "src/constants"),
        "@/hooks": path.resolve(__dirname, "src/hooks"),
        "@/pages": path.resolve(__dirname, "src/pages"),
        "@/routers": path.resolve(__dirname, "src/routers"),
        "@/store": path.resolve(__dirname, "src/store")
      }
    },
    base: env.BASE,
    server: {
      proxy: {
        "/api": env.HOST
      }
    }
  }
})
