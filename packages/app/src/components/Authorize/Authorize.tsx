"use client";

export interface AuthorizeProps {
  redirect_uri: string;
  response_mode: string;
  nonce: string;
}

export const Authorize = (props: AuthorizeProps) => {
  return (
    <div>
      <div>
        <h2>Props</h2>
        <p>{JSON.stringify(props)}</p>
      </div>
      <div>
        <button
          onClick={() => {
            const searchParam = new URLSearchParams({
              id_token: "id_token",
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
          }}
        >
          Sign
        </button>
      </div>
    </div>
  );
};
