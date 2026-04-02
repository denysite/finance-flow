import { api } from "@/shared/api/api";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => (
  <>
    <QueryClientProvider client={api.queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>
);
