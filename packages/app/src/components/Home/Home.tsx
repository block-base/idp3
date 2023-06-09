"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

export const Home = () => {
  const router = useRouter();
  return (
    <section>
      <div className="bg-black h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl mb-5">IdP3</h1>
        <p className="mb-5 text-xl">Decentralized Identity Aggregator</p>
        <Button
          onClick={() => {
            router.push("./demo");
          }}
        >
          Demo
        </Button>
      </div>
    </section>
  );
};
