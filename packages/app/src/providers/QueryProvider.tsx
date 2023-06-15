"use client";

import { QueryClient, QueryClientProvider } from "react-query";

export interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = (props: QueryProviderProps) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};
