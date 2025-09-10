import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let baseUrl = "http://localhost:8080";

  if (mode === "hoseop") {
    baseUrl = "https://festspot2.store";
  } else if (mode === "gwangho") {
    baseUrl = "https://festspot.store";
  } else {
    baseUrl = "http://localhost:8080";
  }

  return {
    plugins: [react()],
    define: {
      __API_HOST__: JSON.stringify(baseUrl),
    },
    server: {
      proxy: {
        "/kopis/api": {
          target: "https://kopis.or.kr/openApi/restful/pblprfr", // 실제 API 주소
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/kopis\/api/, ""),
        },
      },
    },
  };
});
