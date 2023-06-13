"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

export interface StartAuthorizationDemoProps {
  className?: string;
}

// TODO: get id token config and handle authorize request
// TODO: send presentation definition to the authorization app
export const StartAuthorizationDemo = (props: StartAuthorizationDemoProps) => {
  const router = useRouter();
  return (
    <section className={props.className}>
      <Button
        onClick={() => {
          router.push("./authorize?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcb&nonce=nonce");
        }}
      >
        Start Authorization Demo
      </Button>
    </section>
  );
};
