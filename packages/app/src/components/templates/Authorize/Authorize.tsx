"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "react-query";
import { WagmiConfig } from "wagmi";

import { Authorize, AuthorizeProps } from "@/components/organisms/Authorize";
import { chains, wagmiConfig } from "@/lib/wallet";

export interface AuthorizeTemplateProps {
  authorizeProp: AuthorizeProps;
}

export const AuthorizeTemplate = ({ authorizeProp }: AuthorizeTemplateProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Authorize {...authorizeProp} />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
};
