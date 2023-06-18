"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Credential } from "@/types/credential";

export const CredentialsContext = createContext<{
  credentials: Credential[];
  selectedCredential?: Credential;
  setCredentials: Dispatch<SetStateAction<Credential[]>>;
  setSelectedCredential: Dispatch<SetStateAction<Credential | undefined>>;
}>({
  credentials: [],
  setCredentials: () => {
    throw new Error("setCredentials was called without a Provider");
  },
  setSelectedCredential: () => {
    throw new Error("setSelectedCredential was called without a Provider");
  },
});
