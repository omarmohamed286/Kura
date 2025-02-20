import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

import "@mantine/core/styles.css";
import "./global.css";

import AppRouter from "./router/AppRouter";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <AppRouter></AppRouter>
    </QueryClientProvider>
  </MantineProvider>
);
