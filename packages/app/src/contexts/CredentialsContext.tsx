"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export const CredentialsContext = createContext<{
  credentials: string[];
  setCredentials: Dispatch<SetStateAction<string[]>>;
}>({
  credentials: [],
  setCredentials: () => {
    throw new Error("setCredentials was called without a Provider");
  },
});
