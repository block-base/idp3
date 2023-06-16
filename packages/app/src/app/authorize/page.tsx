"use client";

import * as ionjs from "@decentralized-identity/ion-sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";

import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";
import { useCredentials } from "@/hooks/useCredentials";
import { useSigningKey } from "@/hooks/useSigningKey";
import { Signer } from "@/lib/signer";

interface SearchParams {
  redirect_uri: string;
  response_mode: string;
  nonce: string;
  className?: string;
  presentation_definition: string;
}

// TODO: get presentation definition and handle it

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { credentials, setCredentials } = useCredentials();
  const { signingKey } = useSigningKey();

  // useEffect(() => {
  //   if (!address) {
  //     return;
  //   }
  //   fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/vc?address=${address}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCredentials(data);
  //     });
  // }, [address, setCredentials]);

  return (
    <Layout title={"IdP3 Authorization"} tagLine={"Aggregate Your Credential"} className={"bg-white text-black"}>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Request</h2>
        <p className={"text-sm"}>{JSON.stringify(searchParams)}</p>
      </div>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Your Wallet</h2>
        <div className={"mb-2"}>
          <ConnectButton />
        </div>
      </div>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Available Credentials</h2>
        <p className={"text-xs"}>{JSON.stringify(credentials)}</p>
      </div>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Handle Authorization Request</h2>
        <Button
          onClick={async () => {
            if (!walletClient || !signingKey) {
              return;
            }
            const [address] = await walletClient.getAddresses();
            const issuer = `did:pkh:eip155:1:${address}#controller`;
            const verificationMethod = `${issuer}#controller`;

            // TODO: replace with pairwise did
            const sub = "did:ion:<identifier>";

            // TODO: delegate
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

            const { publicKey, privateKey } = signingKey;
            const signer = new Signer();
            await signer.init(publicKey, privateKey);

            // SIOP
            const idToken = await signer.siop({ aud: searchParams.redirect_uri, nonce: searchParams.nonce });

            const presentationDefinition = JSON.parse(searchParams.presentation_definition);

            // TODO: add selected vc
            const vcs = [vc];

            const { vp, descriptorMap } = await signer.createVP(
              {
                vcs,
                aud: searchParams.redirect_uri,
                nonce: searchParams.nonce,
              },
              "jwt_vp_json"
            );

            const presentationSubmission = {
              definition_id: presentationDefinition.id,
              id: "example_jwt_vc_presentation_submission",
              descriptor_map: descriptorMap,
            };

            const searchParam = new URLSearchParams({
              id_token: idToken,
              vp_token: vp,
              presentation_submission: JSON.stringify(presentationSubmission),
            });
            if (searchParams.response_mode === "post") {
              fetch(searchParams.redirect_uri, {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: searchParam,
              });
            } else {
              window.location.assign(`${searchParams.redirect_uri}?${searchParam.toString()}`);
            }
          }}
        >
          Authorize
        </Button>
      </div>
    </Layout>
  );
}
