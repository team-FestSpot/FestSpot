import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/kopis/api": {
        target: "https://kopis.or.kr/openApi/restful/pblprfr", // 실제 API 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kopis\/api/, ""),
      },
    },
  },
});
