"use client";
import { IonKey } from "@decentralized-identity/ion-sdk";
import { useContext, useEffect } from "react";

import { SigningKeyContext } from "@/contexts/SigningKeyContext";

export const useSigningKey = () => {
  const { signingKey, setSigningKey } = useContext(SigningKeyContext);

  useEffect(() => {
    IonKey.generateEs256kOperationKeyPair().then(([publicKey, privateKey]) => {
      setSigningKey({ publicKey, privateKey });
    });
  }, [setSigningKey]);

  return { signingKey, setSigningKey };
};
