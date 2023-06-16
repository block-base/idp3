"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/Button";

import presentationDefinition from "../../config/presentation-definition.json";

export interface StartAuthorizationDemoProps {
  className?: string;
}

// TODO: send presentation definition to the authorization app
export const StartAuthorizationDemo = (props: StartAuthorizationDemoProps) => {
  const router = useRouter();
  const [authorizeRequestUrl, setAuthorizeRequestUrl] = useState<string>("");

  useEffect(() => {
    console.log("StartAuthorizationDemo");
    (async () => {
      const oidConfig = await fetch("http://localhost:3000/api/.well-known/openid-configuration", {
        method: "GET",
      }).then((res) => res.json());
      const url = new URL(oidConfig.authorization_endpoint);
      url.searchParams.append("response_type", "id_token vp_token");
      url.searchParams.append("scope", "openid");
      url.searchParams.append("id_token_type", "subject_signed");
      url.searchParams.append("response_mode", "post");

      // App callback url
      url.searchParams.append("client_id", "http://localhost:3000/api/cb");
      // App callback url
      url.searchParams.append("redirect_uri", "http://localhost:3000/api/cb");
      // TODO: add presentation definition
      url.searchParams.append("presentation_definition", JSON.stringify(presentationDefinition));

      const nonce = btoa(String.fromCharCode(...Array.from(window.crypto.getRandomValues(new Uint8Array(16)))));
      localStorage.setItem("nonce", nonce);
      url.searchParams.append("nonce", nonce);

      setAuthorizeRequestUrl(url.toString());
      console.log("StartAuthorizationDemo", url.toString());
    })();
  }, []);

  return (
    <section className={props.className}>
      <Button
        onClick={() => {
          router.push(authorizeRequestUrl);
        }}
        disabled={authorizeRequestUrl === ""}
      >
        Start Authorization Demo
      </Button>
    </section>
  );
};
