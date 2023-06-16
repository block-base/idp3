"use client";

import { createAuthorizationUri } from "@idp3/sdk";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <main>
      <div className={`h-screen flex flex-col items-center justify-center bg-gray-500 text-white`}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl mb-4 text-center">IdP3 Demo</h1>
          <p className="text-xl mb-8 text-center">{"Authorization Example with IdP3"}</p>
          <div className="max-w-xl">
            <button
              className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
              onClick={async () => {
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
                  "http://localhost:3000/.well-known/openid-configuration",
                  "http://localhost:3001/cb",
                  presentationDefinition
                );
                router.push(authorizationUri);
              }}
            >
              Start Authorization Demo
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
