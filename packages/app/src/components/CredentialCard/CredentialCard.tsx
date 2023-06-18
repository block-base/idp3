import { useMemo, useState } from "react";

import { useCredentials } from "@/hooks/useCredentials";
import { isDeepEqual } from "@/lib/utils";
import { Credential } from "@/types/credential";

export interface CredentialCardProps {
  credential: Credential;
}

export const CredentialCard = (props: CredentialCardProps) => {
  const { selectedCredential, setSelectedCredential } = useCredentials();

  const selected = useMemo(() => {
    if (!selectedCredential) {
      return false;
    }
    return isDeepEqual(props.credential, selectedCredential);
  }, [props, selectedCredential]);

  return (
    <div
      className={`relative rounded-lg bg-black text-white h-40 cursor-pointer transform transition duration-500 ease-in-out ${
        selected && "scale-105 opacity-75"
      }`}
      onClick={() => {
        setSelectedCredential(props.credential);
      }}
    >
      <div className="absolute top-0 left-0 p-2 text-left text-xs">{props.credential.platform}</div>
      <div className="absolute top-4 left-0 p-2 text-left text-xs">{props.credential.issuer}</div>
      <div className="absolute bottom-0 right-0 p-2 text-right text-xs">
        {props.credential.credentialSubject.provider}
      </div>
    </div>
  );
};
