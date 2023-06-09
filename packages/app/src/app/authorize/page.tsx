// import { Demo } from "@/components/Demo";
import { HomeLayout } from "@/components/Layout";
import { HandleAuthorizationRequest, HandleAuthorizationRequestProps } from "@/components/SIOP";
import { ConnectWallet } from "@/components/Wallet";

type SearchParams = HandleAuthorizationRequestProps;

const validate = (searchParams: SearchParams) => {
  // TODO: implement
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  validate(searchParams);
  return (
    <HomeLayout title={"IdP3 Authorization"} tagLine={"Aggregate Your Credential"} className={"bg-white text-black"}>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Request</h2>
        <p className={"text-sm"}>{JSON.stringify(searchParams)}</p>
      </div>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Your Wallet</h2>
        <ConnectWallet className={"mb-2"} />
        <h3 className={"font-medium mb-2"}>Available Credential</h3>
        <p className={"text-sm"}>Credential List...</p>
      </div>
      <div className="w-full mb-4">
        <h2 className={"text-lg font-bold mb-2"}>Handle Authorization Request</h2>
        <HandleAuthorizationRequest {...searchParams} />
      </div>
    </HomeLayout>
  );
}
