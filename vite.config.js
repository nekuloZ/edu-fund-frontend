import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src", // 确保别名指向 src 目录
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "element-plus/theme-chalk/src/mixins/mixins" as *;
                        @use "element-plus/theme-chalk/src/common/var" as *;`,
      },
    },
  },
});

