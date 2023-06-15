"use client";

import { useMemo, useState } from "react";

import { CredentialsContext } from "@/contexts/CredentialsContext";

export interface CredentialsProvider {
  children: React.ReactNode;
}

export const CredentialsProvider = (props: CredentialsProvider) => {
  const [credentials, setCredentials] = useState<string[]>([]);
  const value = useMemo(() => ({ credentials, setCredentials }), [credentials]);

  return <CredentialsContext.Provider value={value}>{props.children}</CredentialsContext.Provider>;
};
