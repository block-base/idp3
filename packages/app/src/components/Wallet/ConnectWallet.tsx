"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { WalletProvider } from "@/providers";

export interface ConnectWalletProps {
  className?: string;
}

export const _ConnectWallet = (props: ConnectWalletProps) => {
  return (
    <section className={props.className}>
      <ConnectButton />
    </section>
  );
};

export const ConnectWallet = (props: ConnectWalletProps) => {
  return (
    <WalletProvider>
      <_ConnectWallet {...props} />
    </WalletProvider>
  );
};
