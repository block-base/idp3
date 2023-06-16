"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { SigningKey } from "@/types/SigningKey";

export const SigningKeyContext = createContext<{
  signingKey?: SigningKey;
  setSigningKey: Dispatch<SetStateAction<SigningKey | undefined>>;
}>({
  setSigningKey: () => {
    throw new Error("setSigningKey was called without a Provider");
  },
});
