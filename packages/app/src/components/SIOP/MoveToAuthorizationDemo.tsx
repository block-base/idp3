"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

export interface MoveToAuthorizationDemoProps {
  className?: string;
}

export const MoveToAuthorizationDemo = (props: MoveToAuthorizationDemoProps) => {
  const router = useRouter();
  return (
    <section className={props.className}>
      <Button
        onClick={() => {
          router.push("./demo");
        }}
      >
        Move to Authorization Demo
      </Button>
    </section>
  );
};
