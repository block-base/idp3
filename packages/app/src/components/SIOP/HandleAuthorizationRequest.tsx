"use client";

import { SignIn } from "@/components/Wallet";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const didKeyDriver = require("did-method-key").driver();

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

          const didDocument = await didKeyDriver.generate();
          console.log("didDocument", didDocument);

          // TODO: Create ID Token
          const idToken = "";

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
