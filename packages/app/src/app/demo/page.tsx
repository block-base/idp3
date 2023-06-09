import { HomeLayout } from "@/components/Layout";
import { StartAuthorizationDemo } from "@/components/SIOP";

export default function Page() {
  return (
    <HomeLayout title={"IdP3 Demo"} tagLine={"Authorization Example with IdP3"} className={"bg-gray-500 text-white"}>
      <StartAuthorizationDemo />
    </HomeLayout>
  );
}
