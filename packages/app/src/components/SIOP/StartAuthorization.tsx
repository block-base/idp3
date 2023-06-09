"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

export const StartAuthorization = () => {
  const router = useRouter();
  return (
    <section>
      <Button
        onClick={() => {
          router.push("./authorize?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcb&nonce=nonce");
        }}
      >
        StartAuthorization
      </Button>
    </section>
  );
};
