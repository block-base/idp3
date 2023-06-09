"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

export const Home = () => {
  const router = useRouter();
  return (
    <section>
      <Button
        onClick={() => {
          router.push("./demo");
        }}
      >
        Demo
      </Button>
    </section>
  );
};
