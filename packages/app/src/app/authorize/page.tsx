// import { Demo } from "@/components/Demo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ClientOnly } from "@/components/ClientOnly";
import { HomeLayout } from "@/components/Layout";
import { HandleAuthorizationRequest, HandleAuthorizationRequestProps } from "@/components/SIOP";
import { AvailableCredentials } from "@/components/Wallet";

type SearchParams = HandleAuthorizationRequestProps;

// TODO: get presentation definition and handle it

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <HomeLayout title={"IdP3 Authorization"} tagLine={"Aggregate Your Credential"} className={"bg-white text-black"}>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Request</h2>
        <p className={"text-sm"}>{JSON.stringify(searchParams)}</p>
      </div>
      <ClientOnly>
        <div className="w-full mb-4">
          <h2 className={"text-lg font-bold mb-2"}>Your Wallet</h2>
          <div className={"mb-2"}>
            <ConnectButton />
          </div>
        </div>
        <div className="w-full mb-4">
          <h2 className={"text-lg font-bold mb-2"}>Available Credentials</h2>
          <AvailableCredentials className={"mb-2"} />
        </div>
        <div className="w-full mb-4">
          <h2 className={"text-lg font-bold mb-2"}>Handle Authorization Request</h2>
          <HandleAuthorizationRequest {...searchParams} />
        </div>
      </ClientOnly>
    </HomeLayout>
  );
}
