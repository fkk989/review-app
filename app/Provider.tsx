// app/providers.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendApiUrl } from "@/store";
import { useGetAdmin } from "@/hooks";
import { RecoilRoot } from "recoil";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <NextUIProvider>
      <NextThemeProvider attribute="class" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>{children}</RecoilRoot>
          <ReactQueryDevtools position="bottom" buttonPosition="bottom-left" />
        </QueryClientProvider>
      </NextThemeProvider>
    </NextUIProvider>
  );
}
