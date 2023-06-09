"use client";

import { useSignMessage } from "wagmi";

import { Button } from "@/components/Button";
import { QueryProvider, WalletProvider } from "@/providers";

export interface SignInProps {
  onSuccess?: (data: string) => void;
}

export const _SignIn = (props: SignInProps) => {
  const { signMessage } = useSignMessage({ onSuccess: props.onSuccess });
  return (
    <section>
      <Button onClick={() => signMessage({ message: "sign in" })}>Sign</Button>
    </section>
  );
};

export const SignIn = (props: SignInProps) => {
  return (
    <QueryProvider>
      <WalletProvider>
        <_SignIn {...props} />
      </WalletProvider>
    </QueryProvider>
  );
};
