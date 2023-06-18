"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Siop } from "@/lib/siop";

export const SigningKeyContext = createContext<{
  siop?: Siop;
  setSiop: Dispatch<SetStateAction<Siop | undefined>>;
}>({
  setSiop: () => {
    throw new Error("setSiop was called without a Provider");
  },
});
