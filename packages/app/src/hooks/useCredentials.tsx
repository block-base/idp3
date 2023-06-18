"use client";

import { useContext, useEffect } from "react";

import { CredentialsContext } from "@/contexts/CredentialsContext";

export const useCredentials = () => {
  const { credentials, selectedCredential, setCredentials, setSelectedCredential } = useContext(CredentialsContext);

  useEffect(() => {
    const credentialsString = localStorage.getItem("credentials");
    if (!credentialsString) {
      return;
    }
    const credentials = JSON.parse(credentialsString);
    setCredentials(credentials);
  }, [setCredentials]);

  const syncCredentials = async (address: string) => {
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/vc?address=${address}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return;
        }
        setCredentials(data);
        localStorage.setItem("credentials", JSON.stringify(data));
      });
  };

  return { credentials, selectedCredential, setSelectedCredential, syncCredentials };
};
