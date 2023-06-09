"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { WalletProvider } from "@/providers";

export const _ConnectWallet = () => {
  return (
    <section>
      <ConnectButton />
    </section>
  );
};

export const ConnectWallet = () => {
  return (
    <WalletProvider>
      <_ConnectWallet />
    </WalletProvider>
  );
};
