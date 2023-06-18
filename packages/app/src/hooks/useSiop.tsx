"use client";

import { IonKey } from "@decentralized-identity/ion-sdk";
import { useContext, useEffect } from "react";

import { SigningKeyContext } from "@/contexts/SiopContext";
import { Siop } from "@/lib/siop";

export const useSiop = () => {
  const { siop, setSiop } = useContext(SigningKeyContext);

  // TODO: make this persistent
  useEffect(() => {
    IonKey.generateEs256kOperationKeyPair().then(([publicKey, privateKey]) => {
      const siop = new Siop();
      siop.init(publicKey, privateKey).then(() => {
        setSiop(siop);
      });
    });
  }, [setSiop]);

  return { siop };
};
