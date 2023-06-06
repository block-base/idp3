"use client";

import { SignMessage } from "../Wallet";

export interface CreateSelfIssuedTokenAndCallbackProps {
  redirect_uri: string;
  response_mode: string;
  nonce: string;
}

export const CreateSelfIssuedTokenAndCallback = (props: CreateSelfIssuedTokenAndCallbackProps) => {
  return (
    <SignMessage
      onSuccess={(data) => {
        const idToken = data;
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
  );
};
