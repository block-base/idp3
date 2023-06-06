// import * as jose from "jose";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idToken = searchParams.get("id_token");

  if (typeof idToken !== "string") {
    throw new Error("id_token type is invalid");
  }

  console.log("idToken", idToken);
  // const header = jose.decodeProtectedHeader(idToken);

  // // TODO: implement dynamic mapping of issuer
  // console.log("header", header);

  return new Response("verified", {
    status: 200,
  });
}
