import { HomeLayout } from "@/components/Layout";
import { MoveToAuthorizationDemo } from "@/components/SIOP";

export default function Page() {
  return (
    <HomeLayout title={"IdP3"} tagLine={"Decentralized Identity Aggregator"} className={"bg-black text-white"}>
      <MoveToAuthorizationDemo />
    </HomeLayout>
  );
}
