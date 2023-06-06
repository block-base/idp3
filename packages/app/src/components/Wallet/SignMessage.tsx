"use client";

import { useSignMessage } from "wagmi";

import { QueryProvider, WalletProvider } from "@/providers";

export interface SignMessageProps {
  onSuccess?: (data: string) => void;
}

export const _SignMessage = (props: SignMessageProps) => {
  const { signMessage } = useSignMessage({ onSuccess: props.onSuccess });
  return <button onClick={() => signMessage({ message: "message" })}>Sign</button>;
};

export const SignMessage = (props: SignMessageProps) => {
  return (
    <QueryProvider>
      <WalletProvider>
        <_SignMessage {...props} />
      </WalletProvider>
    </QueryProvider>
  );
};
