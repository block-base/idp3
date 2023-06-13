import { NextResponse } from "next/server";
// import * as jose from "jose";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idToken = searchParams.get("id_token");

  if (typeof idToken !== "string") {
    throw new Error("id_token type is invalid");
  }

  console.log("idToken", idToken);
  // const header = jose.decodeProtectedHeader(idToken);

  // TODO: verify id token
  // TODO: verify vp token
  // console.log("header", header);
  return NextResponse.json({ verified: true }, { status: 200 });
}
