"use client";

import { useState } from "react";

import { CredentialsContext } from "@/contexts/CredentialsContext";

export interface CredentialsProvider {
  children: React.ReactNode;
}

export const CredentialsProvider = (props: CredentialsProvider) => {
  const [credentials, setCredentials] = useState<string[]>([]);
  return (
    <CredentialsContext.Provider value={{ credentials, setCredentials }}>{props.children}</CredentialsContext.Provider>
  );
};
