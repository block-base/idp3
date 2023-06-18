"use client";

import { createAuthorizationUri, createNonce } from "@idp3/sdk";
import { useEffect, useState } from "react";

export default function Page() {
  const [nonce, setNonce] = useState("");
  const [status, setStatus] = useState<"initial" | "authorizing" | "authorized">("initial");

  const [idToken, setIdToken] = useState("");
  const [vpToken, setVpToken] = useState("");

  useEffect(() => {
    if (status !== "authorizing" || !nonce) {
      return;
    }
    const intervalId = setInterval(async () => {
      console.log("nonce", nonce);
      const { idToken, vpToken } = await fetch(`${process.env.NEXT_PUBLIC_DEMO_URL}/cb?nonce=${nonce}`).then(
        (response) => response.json()
      );
      if (!idToken || !vpToken) {
        return;
      }
      setStatus("authorized");
      clearInterval(intervalId);
      setIdToken(idToken);
      setVpToken(vpToken);
    }, 1000);
  }, [status, nonce]);

  return (
    <main>
      <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-500 text-white py-12`}>
        <h1 className="text-5xl mb-4 text-center">IdP3 Demo</h1>
        <p className="text-xl mb-8 text-center">{"Authorization Example with IdP3"}</p>
        {status === "initial" && (
          <div className="max-w-md w-full mb-8">
            <button
              disabled={status !== "initial"}
              className={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded disabled:opacity-50"
              }
              onClick={async () => {
                setStatus("authorizing");
                const nonce = createNonce();
                setNonce(nonce);

                const presentationDefinition = {
                  id: "SamplePresentationDefinition",
                  input_descriptors: [
                    {
                      id: "DIDCMemberCredential",
                      constraints: {
                        fields: [
                          {
                            path: ["$.vp.verifiableCredential[0].credentialSubject.provider"],
                            filter: {
                              type: "string",
                              pattern: "EthGTEOneTxnProvider",
                            },
                          },
                          {
                            path: ["$.vp.verifiableCredential[1].type"],
                            filter: {
                              type: "string",
                              pattern: "DelegateEthGTEOneTxnProvider",
                            },
                          },
                        ],
                      },
                      format: {
                        jwt_vp_json: {
                          proof_type: ["ES256K"],
                        },
                      },
                    },
                  ],
                };
                const authorizationUri = await createAuthorizationUri(
                  `${process.env.NEXT_PUBLIC_APP_URL}/.well-known/openid-configuration`,
                  `${process.env.NEXT_PUBLIC_DEMO_URL}/cb`,
                  presentationDefinition,
                  nonce
                );
                window.open(authorizationUri, "_blank");
              }}
            >
              Start Authorization Demo
            </button>
          </div>
        )}

        {status !== "initial" && (
          <div className="max-w-md w-full">
            <div className="mb-8">
              <h2 className={"text-lg font-bold mb-2"}>ID Token</h2>
              <div className={"text-xs break-all mb-2"}>{idToken || "authorizing..."}</div>
            </div>
            <div className="mb-8">
              <h2 className={"text-lg font-bold mb-2"}>VP Token</h2>
              <div className={"text-xs break-all mb-2"}>{vpToken || "authorizing..."}</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
