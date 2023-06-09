"use client";

import { SignIn } from "@/components/Wallet";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const didKeyDriver = require("did-method-key").driver();

export interface CreateSelfIssuedTokenAndCallbackProps {
  redirect_uri: string;
  response_mode: string;
  nonce: string;
}

export const CreateSelfIssuedTokenAndCallback = (props: CreateSelfIssuedTokenAndCallbackProps) => {
  return (
    <section>
      <SignIn
        onSuccess={async (signature) => {
          console.log(signature);
          const didDocument = await didKeyDriver.generate();
          console.log("didDocument", didDocument);

          const idToken = signature;
          const searchParam = new URLSearchParams({
            id_token: idToken,
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
