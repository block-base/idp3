"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { fetchEnsAvatar, fetchEnsName } from "@wagmi/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { CredentialCard } from "@/components/CredentialCard";
import { Layout } from "@/components/Layout";
import { useCredentials } from "@/hooks/useCredentials";
import { useIsWalletConnected } from "@/hooks/useIsWalletConnected";
import { useSiop } from "@/hooks/useSiop";

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
  const { isWalletConnected } = useIsWalletConnected();
  const { credentials, selectedCredential, syncCredentials } = useCredentials();
  const { siop } = useSiop();

  const [ensName, setENSName] = useState("");
  const [ensAvatar, setENSAvatar] = useState("");
  const [isIncludeENS, setIsIncludeENS] = useState(false);

  const [apeCoinBalance, setApeCoinBalance] = useState("0");
  const [isIncludeApeCoin, setIsIncludeApeCoin] = useState(false);

  const fetchApeCoin = async (address: string) => {
    const goerliRpcUri = "https://rpc.ankr.com/eth_goerli";
    const apeCoinAddress = "0x328507dc29c95c170b56a1b3a758eb7a9e73455c";
    const apeCoinAbi = [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        type: "function",
      },
    ];
    const provider = new ethers.providers.JsonRpcProvider(goerliRpcUri);
    const contract = new ethers.Contract(apeCoinAddress, apeCoinAbi, provider);
    const balance = await contract.balanceOf(address);
    return balance.toString();
  };

  // HackFS bounty integration
  useEffect(() => {
    if (!address) {
      return;
    }
    // ENS
    fetchEnsName({ address }).then((name) => {
      if (!name) {
        return;
      }
      setENSName(name);
      fetchEnsAvatar({ name }).then((avatar) => {
        if (!avatar) {
          return;
        }
        setENSAvatar(avatar);
      });
    });
    fetchApeCoin(address).then((balance) => {
      setApeCoinBalance(balance);
    });
  }, [address]);

  // console.log(address, avatar, name, isSuccess);

  return (
    <Layout
      title={"IdP3 Authorization"}
      tagLine={"Aggregate Your Credential with SIOPv2 and OID4VP"}
      className={"bg-white text-black"}
    >
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Request</h2>
        <p className={"text-xs text-blue-400 mb-2"}>* Request from demo app - relaying party in the OpenID context</p>
        {Object.entries(searchParams).map(([key, value]) => {
          return (
            <div key={key} className="mb-2">
              <p className={"text-sm font-medium mb-1"}>{key}</p>
              <p className={"text-xs"}>{value}</p>
            </div>
          );
        })}
      </div>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Pairwise DID</h2>
        <p className={"text-xs text-blue-400 mb-2"}>
          * Your one time identifier - ID/VP Token issuer in the OpenID context
        </p>
        <div className={"text-xs break-all mb-2"}>{siop && siop.did}</div>
      </div>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Your Wallet</h2>
        <p className={"text-xs text-blue-400 mb-2"}>* Your web3 wallet which has verifiable credential</p>
        <div className={"mb-2"}>
          <ConnectButton accountStatus="avatar" />
        </div>
      </div>
      {isWalletConnected && (
        <>
          <div className="w-full mb-4">
            <h2 className={"text-lg font-bold mb-2"}>ENS Profile</h2>
            <p className={"text-xs text-blue-400 mb-2"}>* Your profile is fetched from ENS</p>

            {ensName && (
              <div className="mb-2">
                <p className={"text-sm font-medium mb-1"}>Name</p>
                <p className={"text-xs"}>{ensName}</p>
              </div>
            )}
            {ensAvatar && (
              <div className="mb-2">
                <p className={"text-sm font-medium mb-1"}>Avatar</p>
                <p className={"text-xs"}>{ensAvatar}</p>
              </div>
            )}
            <div className="py-2">
              <Checkbox label="Inclue ENS credential" checked={isIncludeENS} setChecked={setIsIncludeENS} />
            </div>
          </div>
          <div className="w-full mb-4">
            <h2 className={"text-lg font-bold mb-2"}>ApeCoin</h2>
            <p className={"text-xs text-blue-400 mb-2"}>* Balance on Goerli network</p>
            <div className="mb-2">
              <p className={"text-sm font-medium mb-1"}>Balance</p>
              <p className={"text-xs"}>{apeCoinBalance}</p>
            </div>
            <div className="py-2">
              <Checkbox label="Inclue ApeCoin credential" checked={isIncludeApeCoin} setChecked={setIsIncludeApeCoin} />
            </div>
          </div>
        </>
      )}
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Credentials on Ceramic</h2>
        <p className={"text-xs text-blue-400 mb-2"}>* integrated with Gitcoin Passport verifiable credential</p>
        {credentials.map((credential, i) => {
          return (
            <div key={i} className={"text-xs mb-4"}>
              <CredentialCard credential={credential} />
            </div>
          );
        })}
        <Button
          disabled={!isWalletConnected}
          onClick={() => {
            if (!address) {
              return;
            }
            syncCredentials(address);
          }}
        >
          Sync Credential
        </Button>
      </div>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Handle Authorization Request</h2>
        <Button
          disabled={!selectedCredential}
          onClick={async () => {
            if (!walletClient || !siop || !selectedCredential) {
              return;
            }
            const [address] = await walletClient.getAddresses();
            const issuer = `did:pkh:eip155:1:${address}#controller`;
            const verificationMethod = `${issuer}#controller`;
            const sub = siop.did;

            const message = {
              "@context": ["https://www.w3.org/2018/credentials/v1"],
              id: "id", // TODO: create vc id
              type: ["VerifiableCredential", "IdP3DelegatedCredential"],
              issuer,
              credentialSubject: {
                ...selectedCredential.credentialSubject,
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
              CredentialSubject: [
                { name: "id", type: "string" },
                { name: "provider", type: "string" },
              ],
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

            const idToken = await siop.createIdToken({ aud: searchParams.redirect_uri, nonce: searchParams.nonce });
            console.log(searchParams);
            const presentationDefinition = JSON.parse(searchParams.presentation_definition);
            const vcs = [selectedCredential, vc];

            //  reuse proof for now
            if (isIncludeENS) {
              vcs.push({
                ...vc,
                credentialSubject: {
                  ...vc.credentialSubject,
                  provider: "ENS",
                  name: ensName,
                  avatar: ensAvatar,
                },
              });
            }

            if (isIncludeApeCoin) {
              vcs.push({
                ...vc,
                credentialSubject: {
                  ...vc.credentialSubject,
                  provider: "ApeCoin",
                  balance: apeCoinBalance,
                },
              });
            }

            const { vp, descriptorMap } = await siop.createVpToken(
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
              nonce: searchParams.nonce,
            });
            await fetch(searchParams.redirect_uri, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: searchParam,
            });
            window.close();
          }}
        >
          Authorize
        </Button>
      </div>
    </Layout>
  );
}

export const dynamic = "force-dynamic";
