"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";

export default function Page() {
  const router = useRouter();
  return (
    <Layout title={"IdP3"} tagLine={"Decentralized Identity Aggregator"} className={"bg-black text-white"}>
      <Button
        onClick={() => {
          router.push(`${process.env.NEXT_PUBLIC_DEMO_URL}`);
        }}
      >
        Move to Authorization Demo
      </Button>
    </Layout>
  );
}
