import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Global } from "@emotion/react";
import { global } from "./styles/global";
import AdminMainPage from "./admin/page/AdminMainPage/AdminMainPage.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <>
        <Global styles={global} />
        {/* <App /> */}
        <AdminMainPage />
      </>
    </BrowserRouter>
  </QueryClientProvider>
);
