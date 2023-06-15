"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export const CredentialsContext = createContext<{
  credentials: string[];
  setCredentials: Dispatch<SetStateAction<string[]>>;
}>({
  credentials: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCredentials: () => {},
});
