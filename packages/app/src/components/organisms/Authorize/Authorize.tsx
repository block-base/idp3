import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSignMessage } from "wagmi";

export interface AuthorizeProps {
  redirect_uri: string;
  response_mode: string;
  nonce: string;
}

export const Authorize = (props: AuthorizeProps) => {
  const { signMessage } = useSignMessage({
    onSuccess(data) {
      const idToken = data;
      const searchParam = new URLSearchParams({
        id_token: idToken,
      });
      if (props.response_mode === "post") {
        fetch(props.redirect_uri, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: searchParam,
        });
      } else {
        window.location.assign(`${props.redirect_uri}?${searchParam.toString()}`);
      }
    },
  });

  return (
    <div>
      <ConnectButton />
      <div>
        <h2>Props</h2>
        <p>{JSON.stringify(props)}</p>
      </div>
      <div>
        <button onClick={() => signMessage({ message: "message" })}>Sign</button>
      </div>
    </div>
  );
};
