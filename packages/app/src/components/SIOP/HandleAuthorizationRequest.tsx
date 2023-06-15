"use client";

import * as ionjs from "@decentralized-identity/ion-sdk/dist/lib/index";

import { SignIn } from "@/components/Wallet";

import { Signer } from "../../lib/signer";

export interface HandleAuthorizationRequestProps {
  redirect_uri: string;
  response_mode: string;
  nonce: string;
  className?: string;
}

// TODO: Create Verifiable Presentation

export const HandleAuthorizationRequest = (props: HandleAuthorizationRequestProps) => {
  return (
    <section className={props.className}>
      <SignIn
        onSuccess={async (signature) => {
          console.log(signature);
          const [publicKey, privateKey] = await ionjs.IonKey.generateEs256kOperationKeyPair();

          const signer = new Signer();
          await signer.init(publicKey, privateKey);

          // SIOP
          const idToken = await signer.siop({ aud: props.redirect_uri, nonce: props.nonce });

          // TODO: Create VP
          // const vp = await signer.createVP({ vcs:[vc,delegateVc] }, "jwt_vp_json");
          console.log(idToken);
          const searchParam = new URLSearchParams({
            id_token: idToken,
            vp_token: signature,
          });
          if (props.response_mode === "post") {
            fetch(props.redirect_uri, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: searchParam,
            });
          } else {
            window.location.assign(`${props.redirect_uri}?${searchParam.toString()}`);
          }
        }}
      />
    </section>
  );
};
