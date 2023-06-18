"use client";

import { useState } from "react";

import { CredentialsContext } from "@/contexts/CredentialsContext";
import { Credential } from "@/types/credential";

export interface CredentialsProvider {
  children: React.ReactNode;
}

export const CredentialsProvider = (props: CredentialsProvider) => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [selectedCredential, setSelectedCredential] = useState<Credential>();
  return (
    <CredentialsContext.Provider value={{ credentials, selectedCredential, setCredentials, setSelectedCredential }}>
      {props.children}
    </CredentialsContext.Provider>
  );
};
