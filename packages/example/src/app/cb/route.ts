import { verifyJwtWithDid } from "@idp3/sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const bodyText = await request.text();
  const params = new URLSearchParams(bodyText);

  const idToken = params.get("id_token");
  console.log("idToken", idToken);

  if (typeof idToken !== "string") {
    throw new Error("id_token type is invalid");
  }

  try {
    const isVerified = await verifyJwtWithDid(idToken);
    console.log("verified", isVerified);
    // TODO: verify vp token

    return NextResponse.json(
      { verified: true },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
        },
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ verified: false }, { status: 200 });
  }
}
