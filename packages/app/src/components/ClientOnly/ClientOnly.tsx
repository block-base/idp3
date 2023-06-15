"use client";

import { CredentialsProvider } from "@/providers/CredentialsProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { WalletProvider } from "@/providers/WalletProvider";

export interface ClientOnlyProps {
  children: React.ReactNode;
}

export const ClientOnly = (props: ClientOnlyProps) => {
  return (
    <QueryProvider>
      <WalletProvider>
        <CredentialsProvider>{props.children}</CredentialsProvider>
      </WalletProvider>
    </QueryProvider>
  );
};
