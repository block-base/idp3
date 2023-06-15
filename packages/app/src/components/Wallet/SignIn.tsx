"use client";

import { useWalletClient } from "wagmi";

import { Button } from "@/components/Button";
import { QueryProvider, WalletProvider } from "@/providers";

export interface SignInProps {
  // TODO: define type
  onSuccess?: (data: any) => void;
  className?: string;
}

export const _SignIn = (props: SignInProps) => {
  const { data: walletClient } = useWalletClient();
  return (
    <section className={props.className}>
      <Button
        onClick={async () => {
          if (!props.onSuccess || !walletClient) {
            return;
          }
          const [address] = await walletClient.getAddresses();
          const issuer = `did:pkh:eip155:1:${address}#controller`;
          const verificationMethod = `${issuer}#controller`;

          // TODO: replace with pairwise did
          const sub = "did:ion:<identifier>";

          const message = {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            id: "id", // TODO: create vc id
            type: ["VerifiableCredential"],
            issuer,
            credentialSubject: {
              id: sub,
            },
          };

          const domain = {
            name: "IdP3",
            version: "1",
            chainId: 1,
          };

          const types = {
            VerifiableCredential: [
              { name: "@context", type: "string[]" },
              { name: "id", type: "string" },
              { name: "type", type: "string[]" },
              { name: "issuer", type: "string" },
              { name: "credentialSubject", type: "CredentialSubject" },
            ],
            CredentialSubject: [{ name: "id", type: "string" }],
          };

          const signature = await walletClient.signTypedData({
            domain,
            types,
            primaryType: "VerifiableCredential",
            message,
          });

          const proof = {
            type: "EthereumEip712Signature2021",
            proofPurpose: "assertionMethod",
            proofValue: signature,
            verificationMethod,
            eip712: {
              domain,
              types,
              primaryType: "VerifiableCredential",
            },
          };
          const vc = {
            ...message,
            proof,
          };
          props.onSuccess(vc);
        }}
      >
        Sign
      </Button>
    </section>
  );
};

export const SignIn = (props: SignInProps) => {
  return (
    <QueryProvider>
      <WalletProvider>
        <_SignIn {...props} />
      </WalletProvider>
    </QueryProvider>
  );
};
