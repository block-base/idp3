"use client";

import { useState } from "react";

import { SigningKeyContext } from "@/contexts/SigningKeyContext";
import { SigningKey } from "@/types/SigningKey";

export interface SigningKeyProviderProps {
  children: React.ReactNode;
}

export const SigningKeyProvider = (props: SigningKeyProviderProps) => {
  const [signingKey, setSigningKey] = useState<SigningKey>();

  return (
    <SigningKeyContext.Provider value={{ signingKey, setSigningKey }}>{props.children}</SigningKeyContext.Provider>
  );
};
