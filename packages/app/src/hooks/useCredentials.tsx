"use client";

import { useContext } from "react";

import { CredentialsContext } from "@/contexts/CredentialsContext";

export const useCredentials = () => {
  const { credentials, setCredentials } = useContext(CredentialsContext);

  return { credentials, setCredentials };
};
