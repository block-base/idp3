"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { WalletProvider } from "@/providers";

export interface AvailableCredentialsProps {
  className?: string;
}

export const _AvailableCredentials = (props: AvailableCredentialsProps) => {
  const { address } = useAccount();
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    if (!address) {
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vc?address=${address}`)
      .then((response) => response.json())
      .then((data) => {
        setCredentials(data);
      });
  }, [address]);

  return (
    <section className={props.className}>
      <p className={"text-xs"}>{JSON.stringify(credentials)}</p>
    </section>
  );
};

export const AvailableCredentials = (props: AvailableCredentialsProps) => {
  return (
    <WalletProvider>
      <_AvailableCredentials {...props} />
    </WalletProvider>
  );
};
