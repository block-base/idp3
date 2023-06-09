import { CreateSelfIssuedTokenAndCallback, CreateSelfIssuedTokenAndCallbackProps } from "@/components/SIOP";
import { ConnectWallet } from "@/components/Wallet";

type SearchParams = CreateSelfIssuedTokenAndCallbackProps;

const validate = (searchParams: SearchParams) => {
  // TODO: implement
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  validate(searchParams);
  return (
    <main>
      <ConnectWallet />
      <div>
        <h2>Props</h2>
        <p>{JSON.stringify(searchParams)}</p>
      </div>
      <CreateSelfIssuedTokenAndCallback {...searchParams} />
    </main>
  );
}
