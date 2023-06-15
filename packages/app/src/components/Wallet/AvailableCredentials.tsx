"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useCredentials } from "@/hooks/useCredentials";

export interface AvailableCredentialsProps {
  className?: string;
}

export const AvailableCredentials = (props: AvailableCredentialsProps) => {
  const { address } = useAccount();

  const { credentials, setCredentials } = useCredentials();

  useEffect(() => {
    if (!address) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vc?address=${address}`)
      .then((response) => response.json())
      .then((data) => {
        setCredentials(data);
      });
  }, [address, setCredentials]);

  return (
    <section className={props.className}>
      <p className={"text-xs"}>{JSON.stringify(credentials)}</p>
    </section>
  );
};
