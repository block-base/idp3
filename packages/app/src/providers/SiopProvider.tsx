"use client";

import { useState } from "react";

import { SigningKeyContext } from "@/contexts/SiopContext";
import { Siop } from "@/lib/siop";

export interface SiopProviderProps {
  children: React.ReactNode;
}

export const SiopProvider = (props: SiopProviderProps) => {
  const [siop, setSiop] = useState<Siop>();

  return <SigningKeyContext.Provider value={{ siop, setSiop }}>{props.children}</SigningKeyContext.Provider>;
};
