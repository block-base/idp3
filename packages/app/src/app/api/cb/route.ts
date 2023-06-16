import { NextResponse } from "next/server";

import { verifyIDToken } from "@/lib/verify";
// import * as jose from "jose";

export async function POST(request: Request) {
  const bodyText = await request.text();
  const params = new URLSearchParams(bodyText);

  // id_tokenを取得
  const idToken = params.get("id_token");
  console.log("idToken", idToken);

  if (typeof idToken !== "string") {
    throw new Error("id_token type is invalid");
  }

  try {
    await verifyIDToken(idToken);
    console.log("verified");
  } catch (e) {
    console.log(e);
    return NextResponse.json({ verified: false }, { status: 200 });
  }
  // TODO: verify vp token
  // console.log("header", header);
  return NextResponse.json({ verified: true }, { status: 200 });
}
